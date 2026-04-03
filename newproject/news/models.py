from django.db import models

class Articles(models.Model):
    # title, announcement, full_text, date
    title = models.CharField('Назва новини', max_length=50)
    announcement = models.CharField('Анонс', max_length=250)
    full_text = models.TextField('Повний текст статті')
    date = models.DateTimeField('Дата публікації')
