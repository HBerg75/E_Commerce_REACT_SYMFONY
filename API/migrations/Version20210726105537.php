<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210726105537 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE products_category');
        $this->addSql('ALTER TABLE products ADD category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE products ADD CONSTRAINT FK_B3BA5A5A12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_B3BA5A5A12469DE2 ON products (category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE products_category (products_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_134D097212469DE2 (category_id), INDEX IDX_134D09726C8A81A9 (products_id), PRIMARY KEY(products_id, category_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE products_category ADD CONSTRAINT FK_134D097212469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE products_category ADD CONSTRAINT FK_134D09726C8A81A9 FOREIGN KEY (products_id) REFERENCES products (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE products DROP FOREIGN KEY FK_B3BA5A5A12469DE2');
        $this->addSql('DROP INDEX IDX_B3BA5A5A12469DE2 ON products');
        $this->addSql('ALTER TABLE products DROP category_id');
    }
}
