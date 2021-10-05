<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Rest\Get("/users/list", name = "users_list")
     * @Rest\View
     */
    public function getAllAction()
    {
        $users = $this->getDoctrine()
                    ->getRepository(User::class)
                    ->findAll();

        $UsersList = array();

        foreach($users as $item) {
            $UsersList[] = array(
                'id' => $item->getId(),
                'email' => $item->getEmail(),
                'roles' => $item->getRoles(),
                'password' => $item->getPassword(),
                'first_name' => $item->getFirstName(),
                'last_name' => $item->getLastName(),
                'status' => $item->getStatus(),
                // id	email	roles	password	first_name	last_name	status
            );
        }
        return new JsonResponse($UsersList);
    }

    /**
     * @Rest\Post("/users/new", name = "users_create")
     * @Rest\View
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function createAction(User $user, UserPasswordEncoderInterface $passwordEncoder)
    {
        if (!filter_var($user->getEmail(), FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse("invalid email");
        }

        $users = $this->getDoctrine()
                    ->getRepository(User::class)
                    ->findAll();

        foreach($users as $item) {
            if ($item->getEmail() === $user->getEmail()) {
                return new JsonResponse("already taken");
            }
        }

        $user->setPassword(
            $passwordEncoder->encodePassword(
                $user,
                $user->getPassword()
            )
        ); 
        $entityManager = $this->getDoctrine()->getManager();

        $entityManager->persist($user);
        $entityManager->flush();
        return new JsonResponse("OK");
    }

    /**
     * @Rest\Post("/user/update/email", name = "users_update_email")
     * @Rest\View
     */
    public function updateEmailAction(Request $user)
    {
        $parameters = json_decode($user->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        // Récupère l'utilisateur afin de trouver l'adresse qui lui est liée
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);

        if($currentUser) {
            $currentUser->setEmail($parameters['email']);
            $entityManager->persist($currentUser);
            $entityManager->flush();
            return new JsonResponse("OK");
        } else {
            return new JsonResponse("PROBLEM");
        }
    }

    /**
     * @Rest\Post("/user/update/password", name = "users_update_password")
     * @Rest\View
     */
    public function updatePasswordAction(Request $user, UserPasswordEncoderInterface $passwordEncoder)
    {
        $parameters = json_decode($user->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        // Récupère l'utilisateur afin de trouver l'adresse qui lui est liée
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);

        if($currentUser) {
            $currentUser->setPassword(
                $passwordEncoder->encodePassword(
                    $currentUser,
                    $parameters['password']
                )
            ); 


            // $currentUser->setPassword($parameters['password']);
            $entityManager->persist($currentUser);
            $entityManager->flush();
            return new JsonResponse("OK");
        } else {
            return new JsonResponse("PROBLEM");
        }
    }

    /**
     * @Rest\Post("/users/login", name = "user_login")
     * @Rest\View
     * @ParamConverter("user", converter="fos_rest.request_body")
     */

    public function login(User $user, UserPasswordEncoderInterface $passwordEncoder )
    {
        $entityManager = $this->getDoctrine()->getManager();
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $user->getEmail()]);

        if(!$currentUser){
            return 'Wrong authentification';
        } elseif($this->passwordEncoder->isPasswordValid($currentUser, $user->getPassword())){
            return new JsonResponse(
                [
                    'id' => $currentUser->getId(), 
                    'email' => $currentUser->getEmail(),
                    'firstName' => $currentUser->getFirstName(),
                    'lastName' => $currentUser->getLastName(),
                    'roles' => $currentUser->getRoles(),
                ]
            );
        } else {
            return 'Wrong authentification';
        }
    } 
}
