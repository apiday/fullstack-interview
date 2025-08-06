from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from portfolio.views import FundViewSet, CompanyViewSet
from campaigns.views import CampaignViewSet

router = DefaultRouter()
router.register(r'funds', FundViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'campaigns', CampaignViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]