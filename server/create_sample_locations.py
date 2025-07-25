#!/usr/bin/env python
"""
Script to create sample countries and cities for testing
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from location_services.models import Country, City

def create_sample_countries():
    """Create sample countries"""
    countries_data = [
        {
            'name': 'United States',
            'code': 'US',
            'currency': 'USD',
            'is_active': True
        },
        {
            'name': 'Canada',
            'code': 'CA',
            'currency': 'CAD',
            'is_active': True
        },
        {
            'name': 'United Kingdom',
            'code': 'GB',
            'currency': 'GBP',
            'is_active': True
        },
        {
            'name': 'Germany',
            'code': 'DE',
            'currency': 'EUR',
            'is_active': True
        },
        {
            'name': 'France',
            'code': 'FR',
            'currency': 'EUR',
            'is_active': True
        },
        {
            'name': 'Australia',
            'code': 'AU',
            'currency': 'AUD',
            'is_active': True
        },
        {
            'name': 'Saudi Arabia',
            'code': 'SA',
            'currency': 'SAR',
            'is_active': True
        },
        {
            'name': 'United Arab Emirates',
            'code': 'AE',
            'currency': 'AED',
            'is_active': True
        },
        {
            'name': 'Egypt',
            'code': 'EG',
            'currency': 'EGP',
            'is_active': True
        },
        {
            'name': 'Jordan',
            'code': 'JO',
            'currency': 'JOD',
            'is_active': True
        }
    ]
    
    created_countries = []
    for country_data in countries_data:
        country, created = Country.objects.get_or_create(
            code=country_data['code'],
            defaults=country_data
        )
        if created:
            print(f"Created country: {country.name}")
        created_countries.append(country)
    
    return created_countries

def create_sample_cities():
    """Create sample cities"""
    cities_data = [
        # United States
        {'name': 'New York', 'country_code': 'US'},
        {'name': 'Los Angeles', 'country_code': 'US'},
        {'name': 'Chicago', 'country_code': 'US'},
        {'name': 'Houston', 'country_code': 'US'},
        {'name': 'Phoenix', 'country_code': 'US'},
        {'name': 'Philadelphia', 'country_code': 'US'},
        {'name': 'San Antonio', 'country_code': 'US'},
        {'name': 'San Diego', 'country_code': 'US'},
        {'name': 'Dallas', 'country_code': 'US'},
        {'name': 'San Jose', 'country_code': 'US'},
        
        # Canada
        {'name': 'Toronto', 'country_code': 'CA'},
        {'name': 'Montreal', 'country_code': 'CA'},
        {'name': 'Vancouver', 'country_code': 'CA'},
        {'name': 'Calgary', 'country_code': 'CA'},
        {'name': 'Edmonton', 'country_code': 'CA'},
        {'name': 'Ottawa', 'country_code': 'CA'},
        {'name': 'Winnipeg', 'country_code': 'CA'},
        {'name': 'Quebec City', 'country_code': 'CA'},
        {'name': 'Hamilton', 'country_code': 'CA'},
        {'name': 'Kitchener', 'country_code': 'CA'},
        
        # United Kingdom
        {'name': 'London', 'country_code': 'GB'},
        {'name': 'Birmingham', 'country_code': 'GB'},
        {'name': 'Manchester', 'country_code': 'GB'},
        {'name': 'Leeds', 'country_code': 'GB'},
        {'name': 'Liverpool', 'country_code': 'GB'},
        {'name': 'Sheffield', 'country_code': 'GB'},
        {'name': 'Glasgow', 'country_code': 'GB'},
        {'name': 'Edinburgh', 'country_code': 'GB'},
        {'name': 'Bristol', 'country_code': 'GB'},
        {'name': 'Cardiff', 'country_code': 'GB'},
        
        # Germany
        {'name': 'Berlin', 'country_code': 'DE'},
        {'name': 'Hamburg', 'country_code': 'DE'},
        {'name': 'Munich', 'country_code': 'DE'},
        {'name': 'Cologne', 'country_code': 'DE'},
        {'name': 'Frankfurt', 'country_code': 'DE'},
        {'name': 'Stuttgart', 'country_code': 'DE'},
        {'name': 'Düsseldorf', 'country_code': 'DE'},
        {'name': 'Dortmund', 'country_code': 'DE'},
        {'name': 'Essen', 'country_code': 'DE'},
        {'name': 'Leipzig', 'country_code': 'DE'},
        
        # France
        {'name': 'Paris', 'country_code': 'FR'},
        {'name': 'Marseille', 'country_code': 'FR'},
        {'name': 'Lyon', 'country_code': 'FR'},
        {'name': 'Toulouse', 'country_code': 'FR'},
        {'name': 'Nice', 'country_code': 'FR'},
        {'name': 'Nantes', 'country_code': 'FR'},
        {'name': 'Strasbourg', 'country_code': 'FR'},
        {'name': 'Montpellier', 'country_code': 'FR'},
        {'name': 'Bordeaux', 'country_code': 'FR'},
        {'name': 'Lille', 'country_code': 'FR'},
        
        # Australia
        {'name': 'Sydney', 'country_code': 'AU'},
        {'name': 'Melbourne', 'country_code': 'AU'},
        {'name': 'Brisbane', 'country_code': 'AU'},
        {'name': 'Perth', 'country_code': 'AU'},
        {'name': 'Adelaide', 'country_code': 'AU'},
        {'name': 'Gold Coast', 'country_code': 'AU'},
        {'name': 'Newcastle', 'country_code': 'AU'},
        {'name': 'Canberra', 'country_code': 'AU'},
        {'name': 'Sunshine Coast', 'country_code': 'AU'},
        {'name': 'Wollongong', 'country_code': 'AU'},
        
        # Saudi Arabia
        {'name': 'Riyadh', 'country_code': 'SA'},
        {'name': 'Jeddah', 'country_code': 'SA'},
        {'name': 'Mecca', 'country_code': 'SA'},
        {'name': 'Medina', 'country_code': 'SA'},
        {'name': 'Dammam', 'country_code': 'SA'},
        {'name': 'Taif', 'country_code': 'SA'},
        {'name': 'Tabuk', 'country_code': 'SA'},
        {'name': 'Abha', 'country_code': 'SA'},
        {'name': 'Jizan', 'country_code': 'SA'},
        {'name': 'Najran', 'country_code': 'SA'},
        
        # United Arab Emirates
        {'name': 'Dubai', 'country_code': 'AE'},
        {'name': 'Abu Dhabi', 'country_code': 'AE'},
        {'name': 'Sharjah', 'country_code': 'AE'},
        {'name': 'Ajman', 'country_code': 'AE'},
        {'name': 'Ras Al Khaimah', 'country_code': 'AE'},
        {'name': 'Fujairah', 'country_code': 'AE'},
        {'name': 'Umm Al Quwain', 'country_code': 'AE'},
        {'name': 'Al Ain', 'country_code': 'AE'},
        {'name': 'Al Gharbia', 'country_code': 'AE'},
        {'name': 'Al Dhafra', 'country_code': 'AE'},
        
        # Egypt
        {'name': 'Cairo', 'country_code': 'EG'},
        {'name': 'Alexandria', 'country_code': 'EG'},
        {'name': 'Giza', 'country_code': 'EG'},
        {'name': 'Shubra El Kheima', 'country_code': 'EG'},
        {'name': 'Port Said', 'country_code': 'EG'},
        {'name': 'Suez', 'country_code': 'EG'},
        {'name': 'Luxor', 'country_code': 'EG'},
        {'name': 'Aswan', 'country_code': 'EG'},
        {'name': 'Hurghada', 'country_code': 'EG'},
        {'name': 'Sharm El Sheikh', 'country_code': 'EG'},
        
        # Jordan
        {'name': 'Amman', 'country_code': 'JO'},
        {'name': 'Zarqa', 'country_code': 'JO'},
        {'name': 'Irbid', 'country_code': 'JO'},
        {'name': 'Al Salt', 'country_code': 'JO'},
        {'name': 'Al Karak', 'country_code': 'JO'},
        {'name': 'Madaba', 'country_code': 'JO'},
        {'name': 'Al Tafilah', 'country_code': 'JO'},
        {'name': 'Al Mafraq', 'country_code': 'JO'},
        {'name': 'Al Aqabah', 'country_code': 'JO'},
        {'name': 'Al Ramtha', 'country_code': 'JO'}
    ]
    
    created_cities = []
    for city_data in cities_data:
        try:
            country = Country.objects.get(code=city_data['country_code'])
            city, created = City.objects.get_or_create(
                name=city_data['name'],
                country=country,
                defaults={
                    'is_active': True
                }
            )
            if created:
                print(f"Created city: {city.name}, {country.name}")
            created_cities.append(city)
        except Country.DoesNotExist:
            print(f"Country with code {city_data['country_code']} not found")
    
    return created_cities

def main():
    """Main function to create sample data"""
    print("Creating sample countries...")
    countries = create_sample_countries()
    print(f"Created {len(countries)} countries")
    
    print("\nCreating sample cities...")
    cities = create_sample_cities()
    print(f"Created {len(cities)} cities")
    
    print("\nSample data creation completed!")

if __name__ == '__main__':
    main() 