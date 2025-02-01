"use client";

import { useState, useEffect } from "react";

interface Superhero {
    id: string;
    name: string;
    superpower: string;
    humilityScore: number;
}

export default function SuperheroInterface() {
    const [showForm, setShowForm] = useState(false);
    const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        superpower: "",
        humilityScore: 5,
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =
            e.target.name === "humilityScore"
                ? parseFloat(e.target.value) || 0
                : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (formData.humilityScore < 1 || formData.humilityScore > 10) {
                throw new Error("La puntuación debe estar entre 1 y 10");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/superheroes`,
                {
                    credentials: 'include',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        humilityScore: Number(formData.humilityScore),
                    }),
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Error al crear superhéroe"
                );
            }

            setShowForm(false);
            setFormData({ name: "", superpower: "", humilityScore: 5 });
            await fetchSuperheroes();
        } catch (error) {
            console.error("Error:", error);
            setError(
                error instanceof Error ? error.message : "Error desconocido"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchSuperheroes = async () => {
        try {
            setIsSubmitting(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/superheroes`,
                {
                    credentials: 'include',
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener superhéroes");
            }

            const data = await response.json();
            setSuperheroes(data);
            setError(null);
        } catch (error) {
            console.error("Error:", error);
            setError(
                error instanceof Error ? error.message : "Error desconocido"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchSuperheroes();
    }, []);

    return (
        <main className="min-h-screen bg-[#121212] text-gray-100">
            <section className="container mx-auto px-4 py-8">
                <header className="mb-12">
                    <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-[#007BFF] to-[#00FF99] bg-clip-text text-transparent">
                        CodeHeroes
                    </h1>
                </header>

                {error && (
                    <article
                        role="alert"
                        className="mb-8 p-4 bg-[#FF3131]/20 border border-[#FF3131] rounded-lg flex gap-3 items-center"
                    >
                        <span className="text-2xl">⚠️</span>
                        <section>
                            <h2 className="font-bold text-[#FF3131]">
                                Error de sistema!
                            </h2>
                            <p className="text-sm">{error}</p>
                        </section>
                    </article>
                )}

                <nav className="flex flex-wrap gap-4 justify-center mb-12">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`cyber-button ${
                            showForm
                                ? "bg-[#FF3131] hover:bg-[#FF5555]"
                                : "bg-[#007BFF] hover:bg-[#0099FF]"
                        }`}
                        disabled={isSubmitting}
                    >
                        {showForm ? (
                            <>
                                <span className="text-xl">✖</span>
                                Cancelar
                            </>
                        ) : (
                            <>
                                <span className="text-xl">🦸♂️</span>
                                Nuevo Heroe
                            </>
                        )}
                    </button>

                    <button
                        onClick={fetchSuperheroes}
                        className="cyber-button bg-[#00FF99] hover:bg-[#33FFAD]"
                        disabled={isSubmitting}
                    >
                        <span className="text-xl">💻</span>
                        {isSubmitting
                            ? "Sincronizando..."
                            : "Actualizar Sistema"}
                    </button>
                </nav>

                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto mb-16 p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30"
                    >
                        <fieldset className="space-y-6" disabled={isSubmitting}>
                            <section>
                                <label className="block text-sm font-medium text-[#00FF99] mb-2">
                                    Nombre del Heroe
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF] transition-all"
                                        placeholder="Ej: Debugger Man"
                                        required
                                    />
                                </label>
                            </section>

                            <section>
                                <label className="block text-sm font-medium text-[#00FF99] mb-2">
                                    Superpoder Tecnológico
                                    <input
                                        type="text"
                                        name="superpower"
                                        value={formData.superpower}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF] transition-all"
                                        placeholder="Ej: Capacidad de resolver bugs en segundos"
                                        required
                                    />
                                </label>
                            </section>

                            <section>
                                <label className="block text-sm font-medium text-[#00FF99] mb-2">
                                    Nivel de Humildad (1-10)
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="humilityScore"
                                            value={formData.humilityScore}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="10"
                                            step="0.1"
                                            className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF] transition-all appearance-none"
                                            required
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFD700]">
                                            ⚡{formData.humilityScore}
                                        </span>
                                    </div>
                                </label>
                            </section>

                            <button
                                type="submit"
                                className="w-full cyber-button bg-[#FFD700] hover:bg-[#FFE44D] text-gray-900 mt-6"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="animate-spin">🔄</div>
                                        Compilando Heroe...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-xl">🚀</span>
                                        Desplegar Heroe
                                    </span>
                                )}
                            </button>
                        </fieldset>
                    </form>
                )}

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {superheroes.map((hero) => (
                        <article
                            key={hero.id}
                            className="cyber-card bg-gradient-to-br from-gray-900 to-gray-800 border-[#007BFF]/30"
                        >
                            <header className="mb-4">
                                <h2 className="text-2xl font-bold text-[#00FF99]">
                                    {hero.name}
                                    <small className="ml-2 text-[#FFD700]">
                                        #{hero.id.slice(0, 5)}
                                    </small>
                                </h2>
                            </header>

                            <section className="mb-4">
                                <h3 className="text-[#007BFF] text-2xl font-mono mb-2">
                                    Superpoder:
                                </h3>
                                <p className="text-gray-300 text-lg font-medium">
                                    {hero.superpower}
                                </p>
                            </section>

                            <footer>
                                <h4 className="text-[#007BFF] text-2xl font-mono mb-2">
                                    Nivel Humildad:
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 w-4/5">
                                        <progress
                                            value={hero.humilityScore}
                                            max="10"
                                            className="w-full h-2 bg-gray-700 rounded-full [&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-gradient-to-r from-[#00FF99] to-[#007BFF]"
                                        />
                                        <span className="text-[#FFD700] font-bold">
                                            {hero.humilityScore}/10
                                        </span>
                                    </div>
                                    <span className="text-4xl text-[#00FF99]">
                                        🛡️
                                    </span>
                                </div>
                            </footer>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
}
