import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;

  beforeEach(() => {
    component = new ItemComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should deleteItem", () => {
    const emitSpy = spyOn(component.onItemDeleted, 'emit');

    component.deleteItem();

    expect(emitSpy).toHaveBeenCalled()
  })
});
