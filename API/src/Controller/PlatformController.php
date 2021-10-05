<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Platform;
use App\Form\PlatformType;
use App\Repository\PlatformRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
// use FOS\RestBundle\Controller\Annotations\QueryParam;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Constraints\Json;

class PlatformController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @Rest\Get("/allPlatforms", name = "platforms_list")
     * @Rest\View
     */
    public function getPlatformList(SerializerInterface $serializer){
        $entityManager = $this->getDoctrine()->getManager();
        $AllPlatform = $entityManager->getRepository(Platform::class)->findAll();

        $PlatformList = array();

        foreach($AllPlatform as $item) {
            $PlatformList[] = array(
                'id' => $item->getId(),
                'name' => $item->getName(),
                'logo' => $item->getLogo(),
            );
        }
        return new JsonResponse($PlatformList);  
    }

     /**
     * @Rest\Post("/games_by_platform", name = "games_by_platform")
     * @Rest\View
     */
    public function getByPlatform(Request $platform,SerializerInterface $serializer){
        $parameters = json_decode($platform->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        
        $Platform = $entityManager->getRepository(Platform::class)->findOneBy(['name' => $parameters['platformName']]);
        $AllProducts = $Platform->getProducts();

        $ProductsList = array();
        foreach($AllProducts as $item) {
            $PlatformList = array();

            foreach($item->getPlatforms() as $value) {
                $PlatformList[] = array(
                'id' => $value->getId(),
                'name' => $value->getName(),
                'logo' => $value->getLogo()
                );
            }

            $ProductsList[] = array(
                'id' => $item->getId(),
                'name' => $item->getName(),
                'description' => $item->getDescription(),
                'price' => $item->getPrice(),
                'published_at' => $item->getPublishedAt(),
                'picture' => $item->getPicture(),
                'reduction' => $item->getReduction(),
                'categoryName' => $item->getCategory()->getName(),
                'categoryColor' => $item->getCategory()->getColor(),
                'platform' => $PlatformList
            );
        }
        
        return new JsonResponse($ProductsList);
    }
}
