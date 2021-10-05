<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
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


class CategoryController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @Rest\Get("/allCategories", name = "categorie_list")
     * @Rest\View
     */
    public function getCategoryList(SerializerInterface $serializer){
        $entityManager = $this->getDoctrine()->getManager();
        $AllCategories = $entityManager->getRepository(Category::class)->findAll();

        $CategoryList = array();

        foreach($AllCategories as $item) {
            $CategoryList[] = array(
                'id' => $item->getId(),
                'name' => $item->getName(),
                'color' => $item->getColor(),
            );
        }
        return new JsonResponse($CategoryList);  
    }

     /**
     * @Rest\Post("/games", name = "game_by_categorie")
     * @Rest\View
     */
    public function getByCategorie(Request $categorie,SerializerInterface $serializer){
        $parameters = json_decode($categorie->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        
        $Categorie = $entityManager->getRepository(Category::class)->findOneBy(['name' => $parameters['categoryName']]);
        $AllProducts = $Categorie->getProducts();

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
