# A* algoritması 

Toplam Maliyet (f_score) = Geçilen yol maliyeti (g_score) + Hedefe olan tahmini mesafe (h=heuristic)

* Algoritma her adımda f_score en düşük olan noktayı seçer.

Main Function
```function astar (grid, start, goal)```

* grid -> 2d array
* start -> başlangiç noktasi
* goal -> hedef noktasi


```
const openSet = [start] //Henüz ziyaret edilmemiş ziyaret edilmesi gereken düğümlerdir.
const cameFrom = new Map() //Hangi hücrenin hangi hücreden geldiğini tutar, geri yol çizmek için.
```

```g_score``` -> Başlangıçtan o hücreye kadar olan gerçek maliyet.
```f_score``` ->```g_score```+ ```heuristic```

* her nokta icin baslangicta degerler sonsuz atanir.
```g_score[key(start)] = 0``` :baslangic noktasinin kendisine olan mesafesi 0'dir.
```f_score[key(start)] = heuristic(start, goal)```

```while (openSet.length > 0) { ```//Ziyaret edilmesi gereken dugumler 
```openSet.sort((a,b) => f_score[key(a)] - f_score[key(b)]) ```//f_score'a göre sıralanır.


* Hedefe ulaşıldıysa yol geri cizilir.
```
if(current.x === goal.x && current.z === goal.z) { 
    return reconstructPath(cameFrom, current)
}
```

* komsu hucreler gezilir.
```for(const neighbor of getNeighbors(current, grid)){ ```

```const neighborKey = key(neighbor)``` //komşunun g_score'u guncellenir.

```if (tentativeG < g_score[neighborKey]) {``` //eger yeni deger eski degerden daha iyiyse daha kısa yoldur.


