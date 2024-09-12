from rest_framework import serializers
from .models import Product
import re

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Name cannot be empty")
        if len(value) < 3:
            raise serializers.ValidationError("Name must be at least 3 characters long")
        if not value[0].isupper():
            raise serializers.ValidationError("Name must start with an uppercase letter")
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Description must be at least 10 characters long")
        if len(value) > 500:
            raise serializers.ValidationError("Description cannot exceed 500 characters")
        if bool(re.search('<[^<]+?>', value)):
            raise serializers.ValidationError("Description cannot contain HTML tags")
        return value


    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be a positive number")
        return value
    

