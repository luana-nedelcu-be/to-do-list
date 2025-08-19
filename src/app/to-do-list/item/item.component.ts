import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent {
  @Input() label!: string;
  @Input() checked = false;

  @Output() onItemDeleted = new EventEmitter<void>();

  deleteItem(): void {
    this.onItemDeleted.emit();
  }
}
