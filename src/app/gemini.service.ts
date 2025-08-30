import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private apiUrl = 'http://localhost:5000/transcribe';

  constructor(private http: HttpClient) {}

  transcribeAudio(file: File): Observable<{ transcript: string }> {
    const formData = new FormData();
    formData.append('audio', file);
    return this.http.post<{ transcript: string }>(this.apiUrl, formData);
  }
}
