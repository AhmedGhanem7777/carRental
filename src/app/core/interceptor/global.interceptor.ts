import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private readonly baseUrl: string = 'https://carrentalapi-f0eecab2adfzgqed.uaenorth-01.azurewebsites.net';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    const clonedRequest = request.clone({
      setHeaders: token ? { Authorization: `${token}` } : {},
      url: request.url.includes('assets') ? request.url : `${this.baseUrl}${request.url}`
    });

    return next.handle(clonedRequest);
  }
};















// import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable()
// export class GlobalInterceptor implements HttpInterceptor {
//   private readonly baseUrl: string = 'https://carrentalapi-f0eecab2adfzgqed.uaenorth-01.azurewebsites.net';

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token = localStorage.getItem('token');

//     const clonedRequest = request.clone({
//       setHeaders: {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json'  // تأكد من تحديد الـ Content-Type بشكل صحيح
//       },
//       url: request.url.includes('assets') ? request.url : `${this.baseUrl}${request.url}`
//     });

//     return next.handle(clonedRequest);
//   }
// }











// import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable()
// export class GlobalInterceptor implements HttpInterceptor {
//   private readonly baseUrl: string = 'https://carrentalapi-f0eecab2adfzgqed.uaenorth-01.azurewebsites.net';

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token = localStorage.getItem('token');

//     // تحديد نوع headers بشكل ديناميكي باستخدام Record
//     let headers: Record<string, string> = {
//       'Authorization': token ? `Bearer ${token}` : ''
//     };

//     // إذا كان الطلب يحتوي على FormData، لا نحدد Content-Type
//     if (!(request.body instanceof FormData)) {
//       headers['Content-Type'] = 'application/json'; // لتحديد Content-Type للطلبات التي لا تحتوي على FormData
//     }

//     const clonedRequest = request.clone({
//       setHeaders: headers,
//       url: request.url.includes('assets') ? request.url : `${this.baseUrl}${request.url}`
//     });

//     return next.handle(clonedRequest);
//   }
// }
