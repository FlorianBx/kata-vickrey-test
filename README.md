# 🏛️ Auction House - Système d'Enchères Vickrey

Application web moderne implémentant l'algorithme d'enchères de Vickrey avec Vue.js 3, TypeScript et Tailwind CSS.

## 🎯 Vue d'ensemble

L'application affiche un article aux enchères et calcule automatiquement les gagnants selon l'algorithme de Vickrey : le gagnant (enchère la plus élevée) paie le prix de la deuxième enchère la plus élevée.

**Stack technique :** Vue 3 + TypeScript + Tailwind CSS + Vite + Vitest

## 🏗️ Architecture

```
src/
├── App.vue                    # Composant racine + layout
├── views/HomeView.vue         # Interface principale d'enchères
├── composables/useAuction.ts  # Gestion des données d'enchères
├── utils/vickrey-auction.ts   # Algorithme de Vickrey + tests
├── types/auction.ts           # Interfaces TypeScript
└── assets/main.css            # Styles Tailwind

public/datas/auction.json      # Données mockées
```

## 🔄 Flux d'exécution

1. **HomeView** utilise `useAuction()` pour récupérer les données
2. Affichage du produit avec image, description et prix de réserve
3. Bouton "Show Winner" déclenche le calcul via `vickreyAuction()`
4. Affichage des résultats avec winner et prix final

## 🧩 Composants clés

### `useAuction.ts` - Composable de données
```typescript
export function useAuction(apiUrl = '/datas/auction.json') {
  return { 
    auction, bidders, product,    // Données réactives
    isLoading, error,             // États
    getAuction                    // Fonction fetch
  }
}
```

### `vickrey-auction.ts` - Algorithme principal
```typescript
export function vickreyAuction(bidders: Bidder[], reservePrice: number): VickreyAuctionResult {
  // 1. Collecte toutes les enchères >= prix de réserve
  // 2. Trie par ordre décroissant
  // 3. Gagnant = enchère la plus élevée
  // 4. Prix = deuxième enchère la plus élevée du non gagnant (ou prix de réserve)
}
```

**Gestion des cas particuliers :**
- Aucune enchère valide → Pas de gagnant
- Un seul enchérisseur → Paie le prix de réserve
- Enchères multiples par personne → Toutes prises en compte

### `HomeView.vue` - Interface utilisateur
- États de chargement/erreur
- Calcul temps réel du gagnant via computed property
- Affichage conditionnel des résultats

## 🚀 Installation & Utilisation

```bash
# Installation
pnpm install

# Développement
pnpm dev

# Production
pnpm build

# Tests
pnpm test:unit

# Linting
pnpm lint
```

## 🧪 Tests

**195 lignes de tests** dans `vickrey-auction.test.ts` couvrant :
- Cas normaux (enchères multiples, égalités)
- Cas limites (aucune enchère, un seul enchérisseur)
- Validation d'entrée (valeurs nulles, types invalides)
- Précision numérique (100+ enchérisseurs, décimales)

## 📊 Structure des données

```typescript
interface Auction {
  product: {
    id: number
    name: string
    description: string
    image: string
    reservePrice: number
    state: 'In progress' | 'Closed'
  }
  bidders: Array<{
    name: string
    bids: number[]
  }>
}
```

**Exemple :** 6 enchérisseurs, 3 enchères par personne, prix de réserve 999€

## 🔧 Qualité du code

### Hooks pre-commit (Husky)
- Tests unitaires obligatoires
- Linting + formatage automatique
- Vérification TypeScript

### Configuration
- **ESLint + Prettier** : Style de code cohérent

## 🎨 Décisions techniques

### Architecture
- **Composition API** : Logique réutilisable et typée
- **Composables** : Séparation claire data/UI
- **Types centralisés** : Cohérence TypeScript
- **Tests exhaustifs (TDD)** : Algorithme critique validé

### UI/UX
- **Mobile-first** : Responsive design avec Tailwind
- **Performance** : Images optimisées, fetch prioritaire 

## 🏋🏻‍♀️ Core vitals
<img width="770" alt="image" src="https://github.com/user-attachments/assets/8553c0dd-cb81-407e-8dcb-7623cd9c5ab0" />

---

## 🔴 Tester en live

### Lien de la prod :
- [https://test-kerdres-agency.netlify.app/](https://test-kerdres-agency.netlify.app/)

### Ouvrir la console et aller sur network :
<img width="1461" alt="Screenshot 2025-07-03 at 4 02 20 AM" src="https://github.com/user-attachments/assets/137093ec-e3f9-4522-b704-c364e7371682" />

### Clique droit sur auction.json et clique gauche sur override content :
<img width="1455" alt="Screenshot 2025-07-03 at 4 03 31 AM" src="https://github.com/user-attachments/assets/83712bc4-9025-4163-ad99-941a956a2584" />

### Éditez les valeurs pour tester l'algorithme :
<img width="1456" alt="Screenshot 2025-07-03 at 4 04 50 AM" src="https://github.com/user-attachments/assets/b65413cd-f13c-4bc2-902b-82499092d86d" />

 **Scroll jusqu'au bouton `Show winner` et tester le résultat**
