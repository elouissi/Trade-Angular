import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { RouterModule,  ActivatedRoute,  Router } from "@angular/router"
import {CategoryService} from "../../../../service/category/category.service";
import {Category} from "../../../../models/category/category.module";


@Component({
  selector: "app-category-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {{isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}}
        </h2>

        <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div *ngIf="categoryForm.get('name')?.invalid && categoryForm.get('name')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              Le nom est obligatoire
            </div>
          </div>

          <!-- Description -->


          <!-- Boutons -->
          <div class="flex justify-end space-x-4">
            <button type="button"
                    routerLink="/dashboard/categories"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Annuler
            </button>
            <button type="submit"
                    [disabled]="categoryForm.invalid || isSubmitting"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:focus:ring-offset-gray-800">
              <span *ngIf="isSubmitting" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
              <span *ngIf="!isSubmitting">
                {{isEditing ? 'Mettre à jour' : 'Créer'}}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      /* Styles pour le mode sombre */
      :host-context(.dark) {
        --tw-bg-opacity: 1;
        background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
      }
    `,
  ],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup
  isEditing = false
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.categoryForm = this.fb.group({
      name: ["", [Validators.required]],
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.isEditing = true
      this.loadCategory(id)
    }
  }

  loadCategory(id: string) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description,
        })
        console.log("Category loaded:", category)
      },
      error: (error) => {
        console.error("Error loading category:", error)
      },
    })
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isSubmitting = true
      const category: Category = this.categoryForm.value

      if (this.isEditing) {
        const id = this.route.snapshot.paramMap.get("id")!
        this.categoryService.updateCategory(id, category).subscribe({
          next: (result) => {
            console.log("Category updated:", result)
            this.router.navigate(["/dashboard/categories"])
          },
          error: (error) => {
            console.error("Erreur lors de la mise à jour:", error)
            this.isSubmitting = false
          },
        })
      } else {
        this.categoryService.createCategory(category).subscribe({
          next: (result) => {
            console.log("Category created:", result)
            this.router.navigate(["/dashboard/categories"])
          },
          error: (error) => {
            console.error("Erreur lors de la création:", error)
            this.isSubmitting = false
          },
        })
      }
    }
  }
}

