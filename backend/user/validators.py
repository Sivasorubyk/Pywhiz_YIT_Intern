from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class LetterNumberValidator:
    """
    Validate whether the password contains at least one letter and one number.
    """
    def validate(self, password, user=None):
        has_letter = any(c.isalpha() for c in password)
        has_number = any(c.isdigit() for c in password)
        
        if not has_letter or not has_number:
            raise ValidationError(
                _("The password must contain at least one letter and one number."),
                code='password_no_letter_or_number',
            )

    def get_help_text(self):
        return _("Your password must contain at least one letter and one number.")