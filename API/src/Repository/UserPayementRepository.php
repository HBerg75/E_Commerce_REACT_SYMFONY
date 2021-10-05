<?php

namespace App\Repository;

use App\Entity\UserPayement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserPayement|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserPayement|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserPayement[]    findAll()
 * @method UserPayement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserPayementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserPayement::class);
    }

    // /**
    //  * @return UserPayement[] Returns an array of UserPayement objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserPayement
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
