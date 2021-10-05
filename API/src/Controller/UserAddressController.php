<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\User;
use App\Entity\UserAddress;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Entity\UserAddressRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserAddressController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

        /**
     * @Rest\Post("/user/address/get", name = "users_address_get")
     * @Rest\View
     */
    public function readAction(Request $userPayment)
    {
        // (UserAddressRepository $userAddress)
        // return $this->json($userAddress->findAll())
        // Si problème tu utilise un BUNDLE
        $parameters = json_decode($userPayment->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);
        $currentAddress = $entityManager->getRepository(UserAddress::class)->findOneBy(['user' => $currentUser]);
        return new JsonResponse(
            [
                'id' => $currentAddress->getId(),
                'address' => $currentAddress->getAddress(),
                'city' => $currentAddress->getCity(),
                'postal_code' => $currentAddress->getPostalCode(),
                'country' => $currentAddress->getCountry(),
                'phone' => $currentAddress->getPhone(),
            ]
        );
    }

    /**
     * @Rest\Post("/user/address/new", name = "users_address_create")
     * @Rest\View
     */
    public function createAction(Request $userAddress)
    {
        $parameters = json_decode($userAddress->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        // Récupère l'utilisateur afin de le lier à la table user_address
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);
        $currentUserAddress;
        $currentUserAddress = new UserAddress;

        $currentUserAddress->setUser($currentUser);
        $currentUserAddress->setAddress($parameters['address']);
        $currentUserAddress->setCity($parameters['city']);
        $currentUserAddress->setPostalCode($parameters['postal_code']);
        $currentUserAddress->setCountry($parameters['country']);
        $currentUserAddress->setPhone($parameters['phone']);

        $entityManager->persist($currentUserAddress);
        $entityManager->flush();
        return new JsonResponse("OK");
    }

    /**
     * @Rest\Post("/user/address/update", name = "users_address_update")
     * @Rest\View
     */
    public function updateAction(Request $userAddress)
    {
        $parameters = json_decode($userAddress->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        // Récupère l'utilisateur afin de trouver l'adresse qui lui est liée
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);
        $currentAdress = $entityManager->getRepository(UserAddress::class)->findOneBy(['user' => $currentUser]);

        if($currentAdress) {
            $currentAdress->setAddress($parameters['address']);
            $currentAdress->setCity($parameters['city']);
            $currentAdress->setPostalCode($parameters['postal_code']);
            $currentAdress->setCountry($parameters['country']);
            $currentAdress->setPhone($parameters['phone']);
    
            $entityManager->persist($currentAdress);
            $entityManager->flush();
            return new JsonResponse("OK");
        } else {
            return new JsonResponse("PROBLEM");
        }
    }
}
