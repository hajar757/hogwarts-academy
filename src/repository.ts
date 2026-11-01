
import { Log, MeasureTime, ValidateSpellPower } from "./decorators";
import type { Wizard, Spell, NewWizard } from "./types";
export class Repository<T extends { id: number }> {
  private items: T[] = [];

  @Log
  add(item: T): void {
    this.items.push(item);
  }

  @MeasureTime
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, changes: Partial<T>): boolean {
    const item = this.findById(id);

    if (!item) return false;

    Object.assign(item, changes);
    return true;
  }
}

export class WizardRepository extends Repository<Wizard> {
  // Ex 1: the repository assigns the id
  register(newWizard: NewWizard): Wizard {
    const id = Math.max(0, ...this.getAll().map(w => w.id)) + 1;
    const wizard: Wizard = { ...newWizard, id };
    this.add(wizard);
    return wizard;
  }
   // Ex 2
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}


export class SpellRepository extends Repository<Spell> {
    @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}
