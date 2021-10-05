<?php


namespace App\Controller\Admin;

use App\Entity\Products;
use App\Entity\Category;
use App\Entity\User;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\CrudUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
         $routeBuilder = $this->get(CrudUrlGenerator::class)->build();
         $url = $routeBuilder->setController(ProductsCrudController::class)->generateUrl();
         $url = $routeBuilder->setController(ProductsCrudController::class)->generateUrl();

        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('API');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
        yield MenuItem::linktoRoute('Back to the website', 'fas fa-home', 'homepage');
        yield MenuItem::linkToCrud('Products', 'fas fa-list', Products::class);
        yield MenuItem::linkToCrud('User', 'fas fa-list', User::class);
    }
}
