import { render, screen, fireEvent } from '@testing-library/react';
import DoubleSearchBar from "../components/DoubleSearchBar";
import "@testing-library/jest-dom";

window.scrollTo = jest.fn();

describe('Test pour les inputs', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("L'input pour le départ est présent", () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const input = screen.getByPlaceholderText("D'où partons-nous ?") as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  test("Le contenu de l'input avec le props pour l'input de départ est présent", () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const input = screen.getByPlaceholderText("D'où partons-nous ?") as HTMLInputElement;
    expect(input.value).toBe("Paris");
  });

  test("L'input pour l'arrivée est présent", () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const input = screen.getByPlaceholderText("Où allons-nous ?") as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  test('La suggestion est présente lorsque l\'utilisateur saisit du texte dans l\'input', async () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const inputArrival = screen.getByPlaceholderText("Où allons-nous ?") as HTMLInputElement;

    inputArrival.value = 'Lon';
    await screen.findByRole('list');
    const suggestionsList = screen.getByRole('list');
    
    expect(suggestionsList).toBeInTheDocument();
  });

  test('La suggestion est présente lorsque l\'utilisateur a l\'autofocus présent à l\'arrivée sur la page sur l\'input d\'arrivée', async () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);

    await screen.findByRole('list');
    const suggestionsList = screen.getByRole('list');
    
    expect(suggestionsList.tagName).toBe("UL");
  });

  // Par manque de temps et d'expérience avec jest je n'ai pas pu faire l'ensemble des tests que je souhaitais
  // Voici les tests unitaires manquants:
  // - Check si la premiere suggestion la plus populaire au départ de Paris est bien Londres
  // - Check si le bouton de switch fonctionne correctement
  // - Check si il y a les suggestions les plus populaires lorsque rien n'est renseigné en props dans l'input Départ
  // - Check si une fois qu'on remplit l'input de Départ et que l'input d'arrivée est vide, le focus soit pris directement sur l'arrivée
  // - Check si on clique n'importe où dans l'une des deux div searchbar, le focus est pris sur l'input en question
  // - Check si lorsqu'on a un aucune donnée, le focus est pris sur l'arrivée est propose les 5 choix les plus populaires mais sans prendre en compte le départ vu qu'il n'y en a pas
  // - Check si le focus est perdu lorsqu'on clique ailleurs que sur un input
  // - Check si le focus est donné à l'autre barre de recherche lorsqu'on passe d'un input à l'autre
  // - Check si les suggestions évoluent bien en fonction des caractères que renseignent l'utilisateur dans l'input

  // Dans le fichier SingleSearchBar.test.tsx pour le composant SingleSearchBar:
  // - Check si tous les éléments(barre de recherche, bouton d'envoie) sont présents
  // - Check si le style est exécuté au focus sur l'input
  // - Check si le style s'enlève lorsque le focus est perdu sur l'input
  // - Check si le bouton ne renvoie aucune donnée lorsque l'utilisateur n'a pas le focus dans l'input
  // - Check si le bouton renvoie les données du première élément des suggestions lorsque le focus est sur l'input même si l'utilisateur n'a rien inséré dans l'input
  // - Check si les suggestions évoluent bien en fonction des caractères que renseignent l'utilisateur dans l'input
  // - Check si les données de la suggestion sont bien envoyés au composent DoubleSearchBar lorsque l'utilisateur clique sur une suggestion
  // - Check si l'utilisateur peut cliquer n'importe où sur la suggestion pour qu'elle soit envoyer
});


describe('Test pour les labels', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Le label du départ est présent", () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const label = screen.getByTestId("Départ") as HTMLLabelElement;
    expect(label).toBeInTheDocument();
  });

  test("Le label de l'arrivée est présent", () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const label = screen.getByTestId("Arrivée") as HTMLLabelElement;
    expect(label).toBeInTheDocument();
  });
});


describe('Test pour le bouton switch', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Le bouton de switch est présent", () => {
    window.scrollTo = jest.fn();
    render(<DoubleSearchBar city={"Paris"} uniqueName={"paris"} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});