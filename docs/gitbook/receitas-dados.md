# Dados, filtros e paginação

FilterItem comunica seleção; a aplicação aplica o filtro. Table fornece semântica de tabela, enquanto Pagination comunica a página escolhida. A receita abaixo combina essas peças com um conjunto local de dados.

Crie `ProjetosLista.tsx`:

```tsx
import { FilterItem, Input, Message, Pagination, Table, Text } from '@art-liz/react'
import { useState } from 'react'

const projetos = [
  { id: '1', nome: 'Atlas', ativo: true },
  { id: '2', nome: 'Brisa', ativo: false },
  { id: '3', nome: 'Cedro', ativo: true },
  { id: '4', nome: 'Duna', ativo: false },
  { id: '5', nome: 'Estrela', ativo: true },
]

export function ProjetosLista() {
  const [busca, setBusca] = useState('')
  const [ativos, setAtivos] = useState(false)
  const [pagina, setPagina] = useState(1)
  const filtrados = projetos.filter(
    (item) =>
      item.nome.toLocaleLowerCase().includes(busca.trim().toLocaleLowerCase()) &&
      (!ativos || item.ativo),
  )
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / 2))
  const atual = Math.min(pagina, totalPaginas)
  const visiveis = filtrados.slice((atual - 1) * 2, atual * 2)

  return (
    <section aria-label="Projetos locais">
      <Input
        label="Buscar projeto"
        type="search"
        value={busca}
        onChange={(event) => {
          setBusca(event.target.value)
          setPagina(1)
        }}
        clearable
        onClear={() => {
          setBusca('')
          setPagina(1)
        }}
      />
      <FilterItem
        selected={ativos}
        onSelectedChange={(selected) => {
          setAtivos(selected)
          setPagina(1)
        }}
      >
        Somente ativos
      </FilterItem>
      <Text role="status">{filtrados.length} projetos encontrados</Text>
      {filtrados.length === 0 ? (
        <Message intent="info">Nenhum projeto corresponde à busca.</Message>
      ) : (
        <>
          <Table caption="Projetos encontrados">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Situação</th>
              </tr>
            </thead>
            <tbody>
              {visiveis.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.nome}</th>
                  <td>{item.ativo ? 'Ativo' : 'Inativo'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination page={atual} pageCount={totalPaginas} onPageChange={setPagina} />
        </>
      )}
    </section>
  )
}
```

Mudar a busca ou o filtro retorna à primeira página. O cálculo garante `pageCount` positivo; com zero resultados a receita mostra o estado vazio e omite a paginação. O tamanho de página é uma decisão do exemplo, não uma prop do componente Pagination.

Para dados remotos, a aplicação mantém busca/filtros/página coerentes com a consulta, informa carregamento/erro e evita apresentar uma página antiga como resultado da busca nova. Table não implementa ordenação, seleção, busca ou virtualização automaticamente.

Veja a [referência](componentes.md) de Table, FilterItem, Pagination e Chart. Confira foco no filtro, `aria-pressed`, nomes dos controles, cabeçalhos da tabela e sua rolagem em telas estreitas. Para trocar seções de uma tela, use Tabs; para uma sequência de progresso, use Steps. Para navegar entre URLs, use o roteador da aplicação, como no [primeiro projeto](primeiro-projeto.md).
