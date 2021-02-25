import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  userId: string;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe(
      data => this.userId = data.uid
    );
  }

  public addItem(item: Item): Promise<DocumentReference> {
    return this.db.collection('users/' + this.userId + '/items').add(item);
  }

  public deleteItemById(id: string): Promise<void> {
    return this.db.collection('users/' + this.userId + '/items').doc(id).delete();
  }

  public updateItemById(id: string, item: Item): Promise<void> {
    return this.db.collection('users/' + this.userId + '/items').doc(id).set(item);
  }

  public getItemById(id: string): Observable<Item> {
    return this.db.collection('users/' + this.userId + '/items').doc<Item>(id).valueChanges();
  }

  public getItems(): Observable<Item[]> {
    return this.db.collection<Item>('users/' + this.userId + '/items').snapshotChanges()
      .pipe(
        map(
          snaps => snaps.map(
            snap => <Item>{
              itemId: snap.payload.doc.id,
              ...snap.payload.doc.data()// as Item
            }
          )
        )
      );
  }
}
