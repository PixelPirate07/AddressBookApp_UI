import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-person-address-form',
  templateUrl: './person-address-form.component.html',
  styleUrls: ['./person-address-form.component.scss']
})
export class PersonAddressFormComponent implements OnChanges {
  @Input() person: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  newPerson = {
    id: 0,
    name: '', // Updated field name
    address: '', // Updated field name
    phoneNumber: '', // Updated field name
    email: '' // Updated field name
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.person && changes.person.currentValue) {
      this.newPerson = { ...changes.person.currentValue };
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.newPerson = {
      id: 0,
      name: '', // Updated field name
      address: '', // Updated field name
      phoneNumber: '', // Updated field name
      email: '' // Updated field name
    };
  }

  onSave() {
    if (this.newPerson.name && this.newPerson.address) { // Ensure required fields are filled
      if (!this.newPerson.id) {
        this.newPerson.id = new Date().getTime(); // Generate a unique ID for new entries
      }
      this.save.emit(this.newPerson); // Emit the updated person object
    } else {
      alert('Please fill all required fields.');
    }
  }

  onCancel() {
    this.cancel.emit(); // Emit cancel event
  }

  onReset() {
    this.resetForm(); // Reset the form fields
  }
}
