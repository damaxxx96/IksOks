# Generated by Django 4.2.2 on 2023-12-04 22:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("result", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gameresult",
            name="result",
            field=models.IntegerField(
                choices=[(1, "Player 1 Wins"), (2, "Player 2 Wins")]
            ),
        ),
    ]