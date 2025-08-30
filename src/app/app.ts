import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from './gemini.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  transcript = signal<string>('');
  loading = signal<boolean>(false);

  constructor(private gemini: GeminiService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.loading.set(true);
    this.transcript.set('');

    this.gemini.transcribeAudio(file).subscribe({
      next: (res) => {
        this.transcript.set(res.transcript);
        this.loading.set(false);
      },
      error: () => {
        this.transcript.set('❌ Error transcribing audio');
        this.loading.set(false);
      }
    });
  }
}
