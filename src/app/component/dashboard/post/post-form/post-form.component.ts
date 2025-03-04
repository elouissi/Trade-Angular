import { Component,  OnInit, ViewChild,  ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,  FormBuilder,  FormGroup, Validators,  FormArray } from "@angular/forms"
import { RouterModule,  ActivatedRoute,  Router } from "@angular/router"
import  { PostService } from "../../../../service/post/post.service"
import { PostSelect, PostStatus } from "../../../../models/post/post.module"
import  { HttpClient } from "@angular/common/http"
import  { AuthService } from "../../../../service/auth/auth.service"
import  { CategoryService } from "../../../../service/category/category.service"
import  { Category } from "../../../../models/category/category.module"

@Component({
  selector: "app-post-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {{isEditing ? 'Modifier annonce' : 'Nouvelle annonce'}}
        </h2>

        <form [formGroup]="postForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Titre -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
            <input
              type="text"
              id="title"
              formControlName="title"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div *ngIf="postForm.get('title')?.invalid && postForm.get('title')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              Le titre est obligatoire
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              formControlName="description"
              rows="4"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            <div *ngIf="postForm.get('description')?.invalid && postForm.get('description')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              La description est obligatoire
            </div>
          </div>

          <!-- Catégorie -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie</label>
            <div class="relative">
              <select
                id="category"
                formControlName="category"
                class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="" class="dark:bg-gray-900">Sélectionner une catégorie</option>
                <option *ngFor="let category of categories" [value]="category.name" class="dark:bg-gray-900">
                  {{category.name}}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div *ngIf="postForm.get('category')?.invalid && postForm.get('category')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              La catégorie est obligatoire
            </div>
          </div>

          <!-- Localisation -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Localisation</label>
            <input
              type="text"
              id="location"
              formControlName="location"
              class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div *ngIf="postForm.get('location')?.invalid && postForm.get('location')?.touched"
                 class="text-red-500 dark:text-red-400 text-sm mt-1">
              La localisation est obligatoire
            </div>
          </div>

          <!-- Statut -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Statut</label>
            <div class="relative">
              <select
                id="status"
                formControlName="status"
                class="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option *ngFor="let status of statusOptions" [value]="status" class="dark:bg-gray-900">
                  {{status}}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Photos -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Photos</h3>

            <!-- Zone de drop pour les images -->
            <div
              class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center"
              [class.border-indigo-500]="isDragging"
              (dragover)="onDragOver($event)"
              (dragleave)="onDragLeave($event)"
              (drop)="onDrop($event)"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                #fileInput
                (change)="onFileSelected($event)"
              >
              <div class="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <button type="button" (click)="fileInput.click()" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Sélectionnez des fichiers
                  </button>
                  ou glissez-déposez vos images ici
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF jusqu'à 10MB
                </p>
              </div>
            </div>

            <!-- Prévisualisation des images -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4" *ngIf="previewImages.length > 0">
              <div *ngFor="let preview of previewImages; let i = index" class="relative group">
                <img [src]="preview.url" [alt]="'Preview ' + i" class="h-40 w-full object-cover rounded-lg">
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button type="button" (click)="removeImage(i)" class="text-white hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="flex justify-end space-x-4">
            <button type="button"
                    routerLink="/dashboard/posts"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Annuler
            </button>
            <button type="submit"
                    [disabled]="postForm.invalid || isSubmitting"
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
      /* Styles pour les selects personnalisés */
      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: none;
      }

      /* Styles pour le mode sombre */
      :host-context(.dark) {
        --tw-bg-opacity: 1;
        background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
      }
    `,
  ],
})
export class PostFormComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>

  isDragging = false
  isSubmitting = false
  previewImages: { file: File; url: string }[] = []

  postForm: FormGroup
  isEditing = false
  categories: Category[] = []
  statusOptions = Object.values(PostSelect)

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.postForm = this.fb.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]],
      location: ["", [Validators.required]],
      status: [PostStatus.ACTIVE],
      userId: authService.getId(),
      photos: this.fb.array([]),
    })
  }

  ngOnInit() {
    // Charger les catégories depuis la base de données
    this.loadCategories()

    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.isEditing = true
      this.loadPost(id)
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories
        console.log("Categories loaded:", categories)
      },
      error: (error) => {
        console.error("Error loading categories:", error)
      },
    })
  }

  get photos() {
    return this.postForm.get("photos") as FormArray
  }

  addPhoto() {
    const photoForm = this.fb.group({
      title: ["", Validators.required],
      filePath: ["", Validators.required],
    })
    this.photos.push(photoForm)
  }

  removePhoto(index: number) {
    this.photos.removeAt(index)
  }

  loadPost(id: string) {
    this.postService.getPostById(id).subscribe((post) => {
      this.postForm.patchValue(post)
      post.photos.forEach((photo) => {
        this.photos.push(this.fb.group(photo))
      })
    })
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging = true
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging = false
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging = false

    const files = event.dataTransfer?.files
    if (files) {
      this.handleFiles(files)
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      this.handleFiles(input.files)
    }
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewImages.push({
            file,
            url: e.target?.result as string,
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }

  removeImage(index: number) {
    this.previewImages.splice(index, 1)
  }

  async onSubmit() {
    if (this.postForm.valid) {
      this.isSubmitting = true
      try {
        const formData = new FormData()

        // Ajouter les données du formulaire
        Object.keys(this.postForm.value).forEach((key) => {
          if (key !== "photos") {
            formData.append(key, this.postForm.value[key])
          }
        })

        // Ajouter les fichiers
        this.previewImages.forEach((preview, index) => {
          formData.append(`photos`, preview.file)
        })

        if (this.isEditing) {
          const id = this.route.snapshot.paramMap.get("id")!
          await this.postService.updatePost(id, formData).toPromise()
        } else {
          await this.postService.createPost(formData).toPromise()
        }

        this.router.navigate(["/dashboard/posts"])
      } catch (error) {
        console.error("Erreur lors de la soumission:", error)
        // Gérer l'erreur (afficher un message, etc.)
      } finally {
        this.isSubmitting = false
      }
    }
  }
}

