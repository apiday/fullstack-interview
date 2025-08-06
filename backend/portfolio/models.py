from django.db import models


class Fund(models.Model):
    name = models.CharField(max_length=255)
    size_meur = models.IntegerField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.size_meur}M EUR)"


class Company(models.Model):
    fund = models.ForeignKey(Fund, related_name="companies", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    sector = models.CharField(max_length=100, null=True)
    size_employees = models.IntegerField(null=True, blank=True)
    investment_meur = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.investment_meur}M EUR)"
