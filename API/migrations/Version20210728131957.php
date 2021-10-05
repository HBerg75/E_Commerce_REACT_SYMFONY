<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210728131957 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE platform (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, logo VARCHAR(1000) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE platform_products (platform_id INT NOT NULL, products_id INT NOT NULL, INDEX IDX_36CA5A48FFE6496F (platform_id), INDEX IDX_36CA5A486C8A81A9 (products_id), PRIMARY KEY(platform_id, products_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE platform_products ADD CONSTRAINT FK_36CA5A48FFE6496F FOREIGN KEY (platform_id) REFERENCES platform (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE platform_products ADD CONSTRAINT FK_36CA5A486C8A81A9 FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE platform_products DROP FOREIGN KEY FK_36CA5A48FFE6496F');
        $this->addSql('DROP TABLE platform');
        $this->addSql('DROP TABLE platform_products');
    }
}
