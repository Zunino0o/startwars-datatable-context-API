import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { mockData } from "../mocks/mockData";

describe("teste no app", () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
      json: () => mockData
    }))
  })

    afterEach(() => {
      global.fetch.mockRestore();
  });

  it("teste de render de components", async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })

    await waitFor(() => {
    expect(screen.getByTestId("name-filter"))
    })

    expect(screen.getByTestId("column-filter"))
    expect(screen.getByTestId("comparison-filter"))
    expect(screen.getByTestId("value-filter"))
    expect(screen.getByTestId("button-filter"))
    expect(screen.getByTestId("column-sort"))
    expect(screen.getByTestId("column-sort-input-asc")) 
    expect(screen.getByTestId("column-sort-input-desc"))
    expect(screen.getByTestId("column-sort-button"))

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })

    userEvent.selectOptions(screen.getByTestId("column-filter"), "rotation_period")
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), "menor que")
    userEvent.type(screen.getByTestId("value-filter"), "20")

    fireEvent.click(screen.getByTestId("button-filter"))

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toBeInTheDocument()
    })
    expect(screen.getByTestId('filter')).toHaveTextContent("rotation_period")

    fireEvent.click(screen.getByRole('button', {name: /reset filters/i}))

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })
  })

  it("testa filtros selecionados", async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })

    await waitFor(() => {
    expect(screen.getByTestId("name-filter"))
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })

    userEvent.selectOptions(screen.getByTestId("column-filter"), "rotation_period")
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), "menor que")
    userEvent.type(screen.getByTestId("value-filter"), "20")

    fireEvent.click(screen.getByTestId("button-filter"))

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toBeInTheDocument()
    })
    expect(screen.getByTestId('filter')).toHaveTextContent("rotation_period")

    userEvent.selectOptions(screen.getByTestId("column-filter"), "orbital_period")
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), "maior que")
    userEvent.type(screen.getByTestId("value-filter"), "1000")

    userEvent.click(screen.getByTestId("button-filter"))

    await waitFor(() => {
      expect(screen.getAllByTestId('filter')).toHaveLength(2)
      expect(screen.getAllByTestId('filter')[0]).toHaveTextContent("rotation_period") 
      expect(screen.getAllByTestId('filter')[1]).toHaveTextContent("orbital_period")
    })    

    const delFilt = screen.getAllByRole('button', {name: /X/i})
    userEvent.click(delFilt[0])

    await waitFor(() => {
      expect(screen.getAllByTestId('filter')).toHaveLength(1)
      expect(screen.getAllByTestId('filter')[0]).toHaveTextContent("orbital_period")
    })
  })

  it("testa o seletor de ordem", async () => { 
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })

    userEvent.selectOptions(screen.getByTestId("column-sort"), "population")
    userEvent.click(screen.getByTestId("column-sort-input-asc"))
    userEvent.click(screen.getByTestId("column-sort-button")) 

    expect(screen.getAllByTestId('planet-name')[8]).toHaveTextContent("Hoth")

    userEvent.selectOptions(screen.getByTestId("column-sort"), "orbital_period")
    userEvent.click(screen.getByTestId("column-sort-input-desc"))
    userEvent.click(screen.getByTestId("column-sort-button"))

    expect(screen.getAllByTestId('planet-name')[2]).toHaveTextContent("Hoth")
    expect(screen.getAllByTestId('planet-name')[8]).toHaveTextContent("Naboo") 
  })

  it ("testa o filtro por nome", async () => {  
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })

    userEvent.type(screen.getByTestId("name-filter"), "Tatooine")

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(1)
    })
  })

  it ("testa remover todos os filtros", async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })

    userEvent.selectOptions(screen.getByTestId("column-filter"), "rotation_period")
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), "menor que")
    userEvent.type(screen.getByTestId("value-filter"), "20")

    const button = screen.getByTestId("button-filter")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toBeInTheDocument()
    })
    expect(screen.getByTestId('filter')).toHaveTextContent("rotation_period")

    userEvent.selectOptions(screen.getByTestId("column-sort") , "population")
    userEvent.click(screen.getByTestId("column-sort-input-asc"))
    userEvent.click(screen.getByTestId("column-sort-button")) 

    userEvent.type(screen.getByTestId("name-filter"), "Tatooine")

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(1)
    })

    userEvent.click(screen.getByRole('button', {name: /reset filters/i}))

    await waitFor(() => {
      expect(screen.queryAllByTestId("planet-name")).toHaveLength(10)
    })
  })
})