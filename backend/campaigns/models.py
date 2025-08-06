from django.db import models
from portfolio.models import Company

class Campaign(models.Model):
    name = models.CharField(max_length=255)
    year = models.IntegerField()
    subject = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.year})"

class CampaignTarget(models.Model):
    campaign = models.ForeignKey(Campaign, related_name='targets', on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.campaign.name} -> {self.company.name}"