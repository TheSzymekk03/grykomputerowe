//Formularz
const form = document.getElementById('kontakt-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Dziękujemy za przesłanie formularza!');
  });
}

//Kalkulator DPS
const dpsButton = document.getElementById('licz-dps');
if (dpsButton) {
  dpsButton.addEventListener('click', function () {
    const aps = parseFloat(document.getElementById('aps').value);
    const crit = parseFloat(document.getElementById('crit').value);
    const ad = parseFloat(document.getElementById('ad').value);
    const armor = parseFloat(document.getElementById('armor').value);

    if (isNaN(aps) || isNaN(crit) || isNaN(ad) || isNaN(armor)) {
      alert("Uzupełnij wszystkie pola poprawnymi liczbami.");
      return;
    }

    const critChance = Math.min(Math.max(crit / 100, 0), 1);
    const armorReduction = 100 / (100 + armor);
    const averageDamage = ad * (1 - critChance) + ad * 2 * critChance;
    const dps = averageDamage * aps * armorReduction;

    document.getElementById('wynik-dps').textContent = dps.toFixed(2);
  });
}






const gry = [
    { 
        tytul: "The Witcher 3: Wild Hunt", 
        data: "19.05.2015", 
        gatunek: "RPG", 
        platformy: "PC, PS4, XONE, Switch", 
        ocena: 9.3,
        opis: "Wzór dla gier fabularnych z otwartym światem, bogaty i wciągający świat pełen ważnych decyzji i epickiej fantazji."
    },
    { 
        tytul: "Red Dead Redemption 2", 
        data: "26.10.2018", 
        gatunek: "Przygodowa", 
        platformy: "PC, PS4, XONE", 
        ocena: 9.3,
        opis: "Chyba żadna inna gra nie oferowała tylu możliwości wyrażania siebie w otwartym świecie, a jednocześnie nie miała tak ciekawej i poruszającej historii. Wspaniałe doświadzczenie."
    },
    { 
        tytul: "Cyberpunk 2077", 
        data: "10.12.2020", 
        gatunek: "RPG", 
        platformy: "PC, PS4, XONE, PS5, XSX", 
        ocena: 8.6,
        opis: "Cyberpunk 2077 to jedna z najbardziej niepokojących i oszałamiających gier RPG w historii, w której każda decyzja ma głęboki wpływ na dalszą rozgrywkę."
        
    },
    { 
        tytul: "Elden Ring", 
        data: "25.02.2022", 
        gatunek: "RPG", 
        platformy: "PC, PS4, PS5, XONE, XSX", 
        ocena: 9.6,
        opis: "Elden Ring to gra, która gracz dostosowuje do własnego stylu gry. Czasami wymagająca, czasami złośliwa, ale przede wszystkim niesamowicie wciągająca."
        
    },
    { 
        tytul: "God of War: Ragnarök", 
        data: "09.11.2022", 
        gatunek: "Przygodowa", 
        platformy: "PS4, PS5", 
        ocena: 9.4,
        opis: "Wciągająca historia opowiedziana oczami wielu postaci, walka na najwyższym poziomie. Epicka podróż."
    },
    { 
        tytul: "Hogwarts Legacy", 
        data: "10.02.2023", 
        gatunek: "Przygodowa", 
        platformy: "PC, PS4, PS5, XONE, XSX, Switch", 
        ocena: 8.4,
        opis: "Zdecydowanie pięknie wyglądająca gra, która nie ma przełomowej historii, ale ma piękny świat i dobry system walki."
        
    },
    { 
        tytul: "Baldur's Gate 3", 
        data: "03.08.2023", 
        gatunek: "RPG", 
        platformy: "PC, PS5, XSX", 
        ocena: 9.7,
        opis: "Niesamowita gra. Jej długość i wielkość lore mogą wydawać się na początku przytłaczające, ale warto poświęcić tej grze czas."
        
    },
    { 
        tytul: "Starfield", 
        data: "06.09.2023", 
        gatunek: "RPG", 
        platformy: "PC, XSX", 
        ocena: 8.3,
        opis: "Mimo kilku słabych punktów, Starfield to nadal znakomita gra."
        
    },
    { 
        tytul: "Alan Wake 2", 
        data: "27.10.2023", 
        gatunek: "Horror", 
        platformy: "PC, PS5, XSX", 
        ocena: 8.9,
        opis: "Ekscytująca kontynuacja swojego pierwowzoru z bogatą narracją i naprawdę przerażającymi momentami."
        
    },
    { 
        tytul: "Horizon Forbidden West", 
        data: "18.02.2022", 
        gatunek: "Przygodowa", 
        platformy: "PS4, PS5", 
        ocena: 8.9,
        opis: "Kompletny pakiet we wszystkich aspektach, na których może zależeć graczowi."
        
    }
];

function generujTabeleGier() {
  const tbody = document.querySelector('#tabela-gier tbody');
  const opisDiv = document.getElementById('opis-gry');
  if (!tbody || !opisDiv) return;

  tbody.innerHTML = '';

  gry.forEach(gra => {
    const wiersz = document.createElement('tr');
    wiersz.innerHTML = `
      <td>${gra.tytul}</td>
      <td>${gra.data}</td>
      <td>${gra.gatunek}</td>
      <td>${gra.platformy}</td>
      <td class="${gra.ocena >= 9 ? 'highlight' : ''}">${gra.ocena}/10</td>
    `;

    wiersz.addEventListener('mouseenter', () => {
      opisDiv.textContent = gra.opis;
      opisDiv.classList.add('active');
    });

    wiersz.addEventListener('mouseleave', () => {
      opisDiv.classList.remove('active');
    });

    tbody.appendChild(wiersz);
  });
}

document.addEventListener('DOMContentLoaded', generujTabeleGier);




//mapa
document.querySelectorAll('area').forEach(area => {
  area.addEventListener('mouseover', () => {
    const name = area.dataset.name || "Brak nazwy";
    document.getElementById('map-description').textContent = name;
  });

  area.addEventListener('mouseout', () => {
    document.getElementById('map-description').textContent = "Najedź na obszar, aby zobaczyć co to za miejscówka. Naciśnij aby dowiedzieć się szczegółów.";
  });

  area.addEventListener('click', (e) => {
    e.preventDefault(); 
    const description = area.dataset.description || "Brak opisu.";
    alert(`Opis lokacji: ${description}`);
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    const mapImage = document.getElementById('map-image');
    const mapContainer = document.getElementById('map-container');
    const descriptionBox = document.getElementById('map-description');

    const areas = document.querySelectorAll('area');

    areas.forEach(area => {
      const coords = area.coords.split(',').map(Number);
      const shape = area.shape.toLowerCase();

      if (shape === 'rect' && coords.length === 4) {
        const [x1, y1, x2, y2] = coords;
        const overlay = document.createElement('div');

        overlay.className = 'map-overlay';
        overlay.style.left = `${x1}px`;
        overlay.style.top = `${y1}px`;
        overlay.style.width = `${x2 - x1}px`;
        overlay.style.height = `${y2 - y1}px`;

        overlay.dataset.name = area.dataset.name;
        overlay.dataset.description = area.dataset.description;

        overlay.addEventListener('mouseover', () => {
          descriptionBox.textContent = area.dataset.name || "Brak opisu";
        });

        overlay.addEventListener('mouseout', () => {
          descriptionBox.textContent = "Najedź na obszar, aby zobaczyć co to za miejscówka. Naciśnij aby dowiedzieć się szczegółów.";
        });

        overlay.addEventListener('click', () => {
          alert(area.dataset.description || "Brak szczegółowego opisu.");
        });

        mapContainer.appendChild(overlay);
      }
    });
  });

