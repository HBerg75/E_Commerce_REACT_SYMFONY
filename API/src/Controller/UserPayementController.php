<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\User;
use App\Entity\UserPayement;
use App\Form\UserPayementType;
use App\Repository\UserPayementRepository;
use App\Entity\UserRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserPayementController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @Rest\Post("/user/payement/get", name = "users_payement_get")
     * @Rest\View
     */
    public function readAction(Request $userPayment)
    {
        $parameters = json_decode($userPayment->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);
        $currentPayement = $entityManager->getRepository(UserPayement::class)->findOneBy(['user' => $currentUser]);

        return new JsonResponse(
            [
                'id' => $currentPayement->getId(),
                'payement_type' => $currentPayement->getPayementType(),
                'card_number' => $currentPayement->getCardNumber(),
                'expiry' => $currentPayement->getExpiry(),
                'restrictions' => $currentPayement->getRestrictions(),
            ]
        );
    }

    /**
     * @Rest\Post("/user/payement/new", name = "users_payement_create")
     * @Rest\View
     */
    public function createAction(Request $userPayment)
    {
        $parameters = json_decode($userPayment->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);

        $currentUserPayment = new UserPayement;
        $currentUserPayment->setUser($currentUser);
        $currentUserPayment->setPayementType($parameters['payement']);
        $currentUserPayment->setCardNumber($parameters['card']);
        $currentUserPayment->setExpiry(new \DateTime($parameters['expiry']));

        $entityManager->persist($currentUserPayment);
        $entityManager->flush();
        return new JsonResponse("OK");
    }

    /**
     * @Rest\Post("/user/payement/update", name = "users_payement_update")
     * @Rest\View
     */
    public function updateAction(Request $userPayment)
    {
        $parameters = json_decode($userPayment->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        // Récupère l'utilisateur afin de trouver l'adresse qui lui est liée
        $currentUser = $entityManager->getRepository(User::class)->findOneBy(['id' => $parameters['id_user']]);
        $currentPayment = $entityManager->getRepository(UserPayement::class)->findOneBy(['user' => $currentUser]);

        if($currentPayment) {
            $currentPayment->setPayementType($parameters['payement']);
            $currentPayment->setCardNumber($parameters['card']);
            $currentPayment->setExpiry(new \DateTime($parameters['expiry']));
    
            $entityManager->persist($currentPayment);
            $entityManager->flush();
            return new JsonResponse("OK");
        } else {
            return new JsonResponse("PROBLEM");
        }
    }
}
