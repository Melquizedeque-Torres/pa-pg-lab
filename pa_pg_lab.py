"""
PROJETO 1 – EXPLORANDO PA E PG
Disciplina: Pensamento Computacional & Algoritmos
Entregável 1: Código-fonte do programa em Python (.py)
Atende: Etapa 2 (Menu & Cálculos), Etapa 3 (Iteração Termo a Termo),
        Etapa 4 (Testes) e Etapa 6 (Alcançando a Meta).
"""

def classificar_pa(razao: float) -> str:
    if razao > 0:
        return "Crescente"
    elif razao < 0:
        return "Decrescente"
    else:
        return "Constante"


def classificar_pg(a1: float, razao: float) -> str:
    if razao == 1:
        return "Constante"
    elif razao == 0:
        return "Nula"
    elif razao < 0:
        return "Oscilante / Alternada"
    elif a1 > 0 and razao > 1:
        return "Crescente"
    elif a1 > 0 and 0 < razao < 1:
        return "Decrescente"
    elif a1 < 0 and razao > 1:
        return "Decrescente"
    elif a1 < 0 and 0 < razao < 1:
        return "Crescente"
    return "Geométrica"


def gerar_progressao(tipo: int, a1: float, razao: float, n: int):
    """
    Etapa 3 - Regra de implementação:
    A sequência é construída termo a termo utilizando for, sem depender
    apenas das fórmulas prontas. Durante o loop, a soma também é calculada.
    """
    termos = []
    soma = 0.0
    termo_atual = a1

    for k in range(1, n + 1):
        if k == 1:
            termo_atual = a1
        else:
            if tipo == 1:
                termo_atual = termo_atual + razao  # PA
            else:
                termo_atual = termo_atual * razao  # PG

        termos.append(round(termo_atual, 6))
        soma += termo_atual

    ultimo_termo = termos[-1]
    return termos, ultimo_termo, round(soma, 6)


def alcancar_meta(tipo: int, a1: float, razao: float, meta: float):
    """
    Etapa 6 - Alcançando a Meta:
    Descobre quantos termos são necessários para que a soma ultrapasse a meta.
    """
    termos = []
    soma = 0.0
    termo_atual = a1
    count = 0
    limite = 1000

    while soma <= meta and count < limite:
        count += 1
        if count == 1:
            termo_atual = a1
        else:
            if tipo == 1:
                termo_atual = termo_atual + razao
            else:
                termo_atual = termo_atual * razao

        termos.append(round(termo_atual, 6))
        soma += termo_atual

        # Segurança para casos que convergem a zero e nunca atingem a meta
        if count > 2 and abs(termo_atual) == 0 and soma <= meta:
            break

    return count, round(soma, 6), termos


def formatar_sequencia(termos: list) -> str:
    # Formata números inteiros sem .0 para apresentação limpa
    formatados = []
    for t in termos:
        if isinstance(t, float) and t.is_integer():
            formatados.append(str(int(t)))
        else:
            formatados.append(str(t))
    return ", ".join(formatados)


def menu_principal():
    while True:
        print("\n" + "=" * 32)
        print("          PA & PG LAB")
        print("=" * 32)
        print("1 - Progressão Aritmética (PA)")
        print("2 - Progressão Geométrica (PG)")
        print("3 - Desafio da Meta (Etapa 6)")
        print("4 - Executar 4 Testes da Etapa 4")
        print("0 - Sair")
        print("=" * 32)

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "0":
            print("\nEncerrando o programa. Até mais!")
            break

        elif opcao in ("1", "2"):
            tipo = int(opcao)
            nome_tipo = "PA" if tipo == 1 else "PG"
            nome_razao = "Razão (r): " if tipo == 1 else "Razão (q): "

            try:
                a1 = float(input("\nPrimeiro termo: "))
                razao = float(input(nome_razao))
                n = int(input("Quantidade de termos: "))

                if n < 1:
                    print("A quantidade de termos deve ser pelo menos 1.")
                    continue

                termos, ultimo, soma = gerar_progressao(tipo, a1, razao, n)

                # Apresentação no formato da apostila
                print(f"\n{nome_tipo} gerada:")
                print(formatar_sequencia(termos))
                print(f"\nUltimo termo: {int(ultimo) if ultimo.is_integer() else ultimo}")
                print(f"Soma dos termos: {int(soma) if soma.is_integer() else soma}")

                # Informação adicional de classificação
                classificacao = classificar_pa(razao) if tipo == 1 else classificar_pg(a1, razao)
                print(f"Classificação: {classificacao}")

            except ValueError:
                print("Entrada inválida. Digite valores numéricos válidos.")

        elif opcao == "3":
            print("\n--- Desafio da Etapa 6 (Alcançando a Meta) ---")
            try:
                tipo = int(input("Tipo (1 para PA, 2 para PG): "))
                if tipo not in (1, 2):
                    print("Opção inválida.")
                    continue
                a1 = float(input("Primeiro termo: "))
                razao = float(input("Razão: "))
                meta = float(input("Meta: "))

                n_termos, soma_obtida, seq = alcancar_meta(tipo, a1, razao, meta)

                print("\nResultado:")
                print(f"Sao necessarios {n_termos} termos.")
                print(f"Soma obtida: {int(soma_obtida) if soma_obtida.is_integer() else soma_obtida}")
                print(f"Sequência até superar: {formatar_sequencia(seq)}")
            except ValueError:
                print("Entrada inválida.")

        elif opcao == "4":
            executar_testes_etapa4()
        else:
            print("Opção inválida. Tente novamente.")


def executar_testes_etapa4():
    print("\n" + "#" * 40)
    print("    BATERIA DE TESTES DA ETAPA 4")
    print("#" * 40)

    casos = [
        ("1. PA Crescente", 1, 5, 3, 6),
        ("2. PA Decrescente", 1, 20, -3, 6),
        ("3. PG Crescente", 2, 2, 3, 5),
        ("4. PG Decrescente", 2, 64, 0.5, 6)
    ]

    for nome, tipo, a1, r, n in casos:
        print(f"\n--- {nome} ---")
        print(f"Parâmetros: a1 = {a1}, razão = {r}, n = {n}")
        termos, ult, soma = gerar_progressao(tipo, a1, r, n)
        print(f"Sequência: {formatar_sequencia(termos)}")
        print(f"Último Termo: {int(ult) if ult.is_integer() else ult}")
        print(f"Soma Calculada: {int(soma) if soma.is_integer() else soma}")


if __name__ == "__main__":
    menu_principal()
