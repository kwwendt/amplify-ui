import { Component, HostBinding } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getFormDataFromEvent, authenticatorTextUtil } from '@aws-amplify/ui';

const { getCreateAccountText } = authenticatorTextUtil;

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';

  // translated texts
  public createAccountText = getCreateAccountText();

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    return this.authenticator.slotContext;
  }

  onInput(event: Event) {
    let { checked, name, type, value } = <HTMLInputElement>event.target;

    if (type === 'checkbox' && !checked) value = undefined;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
