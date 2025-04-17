


# BACKEND 
NODE.js + Express

```
node index.js
```

# FRONTEND
REACT + VITE
```
npm run dev
```

*react-three-fiber*: REACT ile cuk oturan ThreeJs paketi
*zustand*: Durum yönetim kütüphanesi, (Robot target veya harita obstacle ekleme vs.)

# KAYNAKLAR

* https://codesandbox.io/p/sandbox/e662p3?file=%2Fsrc%2FEffects.js

ışık ve görünüş için örnek alınabilir: 
* https://sbcode.net/react-three-fiber/usetrimesh-materials/
* https://sbcode.net/react-three-fiber/use-cannon/

hmlt buttons için kullanılabilir:
* https://sbcode.net/react-three-fiber/camera/

select leva:
* https://codesandbox.io/p/sandbox/sleepy-cloud-3zk8rx?file=%2Fsrc%2FApp.js




# React Notlar
targetPos varsa sag taraf çalışır.
```
{targetPos && <Target position={targetPos} /> } 
```




🌈:
Renk	Kod	Açıklama
Zeytin yeşili: 	#606C38	Ana koyu zemin veya vurgu
Derin yeşil: 	#283618	En koyu arka plan
Krem	: #FEFAE0	Açık tema arka plan / yazı zemini
Tarçın turuncu: 	#DDA15E	Buton veya vurgu
Yanık turuncu: 	#BC6C25	Hover / aktif durumlar


# Yeni renkler
* https://coolors.co/palette/606c38-283618-fefae0-dda15e-bc6c25



# Modeller 
* https://free3d.com/3d-model/wolf-cfaracter-lowpoly-769211.html
* https://free3d.com/3d-model/cat-cartoon-rigged-520849.html


# SHORTEST PATH ALGORITHMS


Algoritma	En Kısa Yolu Bulur mu?	Heuristic Kullanır mı?	Performans (Genelde)	Avantajı	Dezavantajı
Dijkstra	                ✅ Evet	❌ Hayır	            Orta	Tüm yolları bulur, garantilidir	Gereksiz yere fazla düğüm arar
A*	                        ✅ Evet	✅ Evet	            Yüksek (iyi heuristic ile)	Hedefe odaklı, verimli	Heuristic kötü ise yavaşlar
Greedy Best-First	        ❌ Hayır	✅ Evet	            Çok hızlı	Hızlı, hedefe çabuk ulaşır	En kısa yolu garanti etmez
BFS (Genişlik Öncelikli)	✅ Evet	❌ Hayır	            Yavaş	Basit, ağırlıksız gridde ideal	Büyük gridlerde çok yavaş
DFS (Derinlik Öncelikli)	❌ Hayır	❌ Hayır	            Hızlı ama dengesiz	Bellek dostu	Genelde kötü yollar bulur
Bidirectional Search	    ✅ Evet	❌/✅ Opsiyonel	   Çok hızlı	Çift taraflı arama	Karmaşık implementasyon
