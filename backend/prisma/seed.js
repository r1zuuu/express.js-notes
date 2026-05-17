const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const tresci = [
  'Trzeba kupić mleko i chleb.',
  'Zadzwonić do dentysty w przyszłym tygodniu.',
  'Skończyć projekt przed piątkiem.',
  'Przeczytać rozdział 5 książki o Node.js.',
  'Zaplanować wakacje na lato.',
  'Nauczyć się podstaw Dockera.',
  'Zrobić porządki w szafie.',
  'Wysłać maila do klienta z ofertą.',
  'Opłacić rachunki za prąd.',
  'Zapisać się na siłownię.',
  'Przejrzeć notatki z ostatniego spotkania.',
  'Naprawić bug w logowaniu.',
  'Zaktualizować zależności w projekcie.',
  'Napisać testy do modułu autoryzacji.',
  'Zamówić nową klawiaturę mechaniczną.',
  'Obejrzeć tutorial o Prisma ORM.',
  'Poprawić stylowanie strony głównej.',
  'Skonfigurować ESLint w projekcie.',
  'Zrobić backup bazy danych.',
  'Przygotować prezentację na wtorek.',
  'Sprawdzić logi serwera z ostatnich 24h.',
  'Dodać paginację do listy notatek.',
  'Zaimplementować wyszukiwarkę notatek.',
  'Przetestować API w Postmanie.',
  'Dodać walidację formularza rejestracji.',
  'Skonfigurować CORS na backendzie.',
  'Nauczyć się o JWT refresh tokenach.',
  'Zoptymalizować zapytania do bazy danych.',
  'Dodać middleware do logowania requestów.',
  'Napisać dokumentację do API.',
  'Zamówić kawę — skończyła się.',
  'Umówić się z przyjacielem na piwo w weekend.',
  'Zrobić przegląd auta przed zimą.',
  'Sprawdzić oferty pracy na LinkedIn.',
  'Odpisać na komentarze na GitHubie.',
  'Zaktualizować portfolio na stronie.',
  'Nauczyć się podstaw TypeScripta.',
  'Przejść kurs o React Query.',
  'Dodać dark mode do aplikacji.',
  'Skonfigurować Tailwind CSS.',
  'Zaimplementować system tagów do notatek.',
  'Dodać możliwość eksportu notatek do PDF.',
  'Nauczyć się pisać migracje w Prisma.',
  'Zrobić code review PR kolegi.',
  'Zaplanować sprinty na następny miesiąc.',
  'Zaktualizować Node.js do najnowszej wersji.',
  'Dodać kompresję do odpowiedzi serwera.',
  'Skonfigurować rate limiting.',
  'Napisać seed data dla środowiska testowego.',
  'Dodać obsługę błędów globalnie w Express.',
  'Zaimplementować soft delete dla notatek.',
  'Dodać pola updatedAt do modelu Note.',
  'Sprawdzić czy aplikacja działa na Firefoxie.',
  'Naprawić layout na mobile.',
  'Dodać loading spinner podczas fetchowania.',
  'Obsłużyć błędy sieciowe w frontendzie.',
  'Dodać toast notifications.',
  'Przetestować rejestrację nowego użytkownika.',
  'Upewnić się że hasła są hashowane.',
  'Dodać możliwość zmiany hasła.',
  'Zaimplementować reset hasła przez email.',
  'Skonfigurować zmienne środowiskowe na produkcji.',
  'Sprawdzić metryki wydajności aplikacji.',
  'Dodać indeksy do bazy danych.',
  'Zoptymalizować czas ładowania strony.',
  'Sprawdzić dostępność aplikacji (a11y).',
  'Dodać favicon do strony.',
  'Zaktualizować README projektu.',
  'Stworzyć diagram architektury aplikacji.',
  'Omówić roadmapę projektu z teamem.',
]

async function main() {
  const users = await prisma.user.findMany()

  for (const user of users) {
    const notes = tresci.map((tresc) => ({
      tresc,
      userId: user.id,
    }))

    await prisma.note.createMany({ data: notes })
    console.log(`Dodano ${notes.length} notatek dla ${user.email}`)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
