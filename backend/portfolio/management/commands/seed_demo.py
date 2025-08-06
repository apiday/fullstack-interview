from django.core.management.base import BaseCommand
from portfolio.models import Fund, Company
from campaigns.models import Campaign, CampaignTarget
from django.db import transaction


class Command(BaseCommand):
    help = "Seeds the database with demo data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding demo data...")

        # Create funds
        fund1 = Fund.objects.create(
            name="Tech Growth Fund",
            size_meur=500,
        )

        fund2 = Fund.objects.create(
            name="Green Energy Fund",
            size_meur=300,
        )

        # Create companies
        companies = [
            Company.objects.create(
                fund=fund1,
                name="CloudTech Solutions",
                sector="Software",
                size_employees=250,
                investment_meur=15.5,
            ),
            Company.objects.create(
                fund=fund1,
                name="DataAI Analytics",
                sector="AI/ML",
                size_employees=120,
                investment_meur=8.2,
            ),
            Company.objects.create(
                fund=fund2,
                name="SolarPower Inc",
                sector="Energy",
                size_employees=400,
                investment_meur=25.0,
            ),
            Company.objects.create(
                fund=fund2,
                name="GreenMobility",
                sector="Transportation",
                size_employees=180,
                investment_meur=12.8,
            ),
        ]

        # Create campaigns
        campaign1 = Campaign.objects.create(
            name="ESG Assessment 2024",
            year=2024,
            subject="Annual ESG performance review",
        )

        campaign2 = Campaign.objects.create(
            name="Growth Metrics Q2",
            year=2024,
            subject="Quarterly growth and performance analysis",
        )

        # Create campaign targets
        for company in companies[:2]:
            CampaignTarget.objects.create(campaign=campaign1, company=company)

        for company in companies[2:]:
            CampaignTarget.objects.create(campaign=campaign2, company=company)

        self.stdout.write(self.style.SUCCESS("Successfully seeded demo data"))
