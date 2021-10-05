<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Products;
use App\Entity\Platform;
use App\Form\ProductsType;
use App\Repository\ProductsRepository;
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

class ProductsController extends AbstractController
{
     /**
     * @Rest\Get("/tous_les_jeux", name = "tous_les_jeux")
     * @Rest\View
     */
    public function displayProducts(SerializerInterface $serializer){
        $entityManager = $this->getDoctrine()->getManager();
        $AllProducts = $entityManager->getRepository(Products::class)->findAll();

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

    /**
     * @Rest\Post("/product/new", name = "product_create")
     * @Rest\View
     */
    public function createAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        $product = new Products;
        $product->setName($parameters['productName']);
        $product->setDescription($parameters['productDescription']);
        $product->setPrice($parameters['productPrice']);
        $product->setPublishedAt(new \DateTime($parameters['productPublished']));
        $product->setPicture($parameters['productPicture']);

        if(!$parameters['productReduction'] || $parameters['productReduction'] === "0" || $parameters['productReduction'] === "" || $parameters['productReduction'] === null) {
            $product->setReduction(null);
        } else {
            $product->setReduction($parameters['productReduction']);
        }
        $gameCategorie = $entityManager->getRepository(Category::class)->findOneBy(['name' => $parameters['productCategory']]);
        $product->setCategory($gameCategorie);

        for($i = 0; $i < count($parameters['productPlatforms']); $i++) {
            $platform = $entityManager->getRepository(Platform::class)->findOneBy(['name' => $parameters['productPlatforms'][$i]]);
            $product->addPlatform($platform);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse("OK");
    }

    /**
     * @Rest\Post("/product/find", name = "product_find")
     * @Rest\View
     */
    public function findAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $ProductsList = [];

        $result = $entityManager->getRepository(Products::class)->createQueryBuilder('o')
            ->where('o.name LIKE :toFind')
            ->setParameter('toFind', '%' . $parameters['toFind'] . '%')
            ->getQuery()
            ->getResult();

        foreach($result as $item) {
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

    /**
     * @Rest\Get("/product/get/{id}", name = "product_get")
     * @Rest\View
     */
    public function readProduct($id){
        $entityManager = $this->getDoctrine()->getManager();
        $item = $entityManager->getRepository(Products::class)->findOneBy(['id' => $id]);

        foreach($item->getPlatforms() as $value) {
            $PlatformList[] = $value->getName();
        }

        return new JsonResponse(
            [
                'id' => $item->getId(),
                'name' => $item->getName(),
                'description' => $item->getDescription(),
                'price' => $item->getPrice(),
                'published_at' => $item->getPublishedAt(),
                'picture' => $item->getPicture(),
                'reduction' => $item->getReduction(),
                'categoryName' => $item->getCategory()->getName(),
                'platform' => $PlatformList
            ]
        );  
    }

    /**
     * @Rest\Get("/product/delete/{id}", name = "product_delete")
     * @Rest\View
     */
    public function deleteProduct($id){
        $entityManager = $this->getDoctrine()->getManager();
        $currentProduct = $entityManager->getRepository(Products::class)->findOneBy(['id' => $id]);
        $entityManager->remove($currentProduct);
        $entityManager->flush();
        return new JsonResponse("OK");  
    }

    /**
     * @Rest\Post("/product/update/{id}", name = "product_update")
     * @Rest\View
     */
    public function updateProduct(Request $request, $id){
        $entityManager = $this->getDoctrine()->getManager();
        $product = $entityManager->getRepository(Products::class)->findOneBy(['id' => $id]);
        $AllPlatform = $entityManager->getRepository(Platform::class)->findAll();
        $parameters = json_decode($request->getContent(), true);

        $product->setName($parameters['productName']);
        $product->setDescription($parameters['productDescription']);
        $product->setPrice($parameters['productPrice']);
        $product->setPublishedAt(new \DateTime($parameters['productPublished']));
        $product->setPicture($parameters['productPicture']);

        if(!$parameters['productReduction'] || $parameters['productReduction'] === "0" || $parameters['productReduction'] === "" || $parameters['productReduction'] === null) {
            $product->setReduction(null);
        } else {
            $product->setReduction($parameters['productReduction']);
        }
        $gameCategorie = $entityManager->getRepository(Category::class)->findOneBy(['name' => $parameters['productCategory']]);
        $product->setCategory($gameCategorie);

        // Retire toutes les plateformes
        foreach ($product->getPlatforms() as $value) {
                $product->removePlatform($value);
        }

        // Ajoutes les nouvelles plateformes
        foreach ($parameters['productPlatforms'] as $value) {
            $gamePlatform = $entityManager->getRepository(Platform::class)->findOneBy(['name' => $value]);
            $product->addPlatform($gamePlatform);
        }

        $entityManager->persist($product);
        $entityManager->flush();
        return new JsonResponse("OK");
    }
}
