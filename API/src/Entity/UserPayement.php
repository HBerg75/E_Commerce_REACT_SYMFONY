<?php

namespace App\Entity;

use App\Repository\UserPayementRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserPayementRepository::class)
 */
class UserPayement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="userPayement", cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $payement_type;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $card_number;

    /**
     * @ORM\Column(type="date")
     */
    private $expiry;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $restrictions = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPayementType(): ?string
    {
        return $this->payement_type;
    }

    public function setPayementType(string $payement_type): self
    {
        $this->payement_type = $payement_type;

        return $this;
    }

    public function getCardNumber(): ?string
    {
        return $this->card_number;
    }

    public function setCardNumber(string $card_number): self
    {
        $this->card_number = $card_number;

        return $this;
    }

    public function getExpiry(): ?\DateTimeInterface
    {
        return $this->expiry;
    }

    public function setExpiry(\DateTimeInterface $expiry): self
    {
        $this->expiry = $expiry;

        return $this;
    }

    public function getRestrictions(): ?array
    {
        return $this->restrictions;
    }

    public function setRestrictions(?array $restrictions): self
    {
        $this->restrictions = $restrictions;

        return $this;
    }
}
