export const metadata = {
  title: "Persónuverndarstefna",
  description:
    "Hvernig MiniMax fer með persónuupplýsingar sem berast í gegnum vefinn, til dæmis í gegnum fyrirspurnarformið.",
  alternates: { canonical: "/personuvernd" },
};

export default function Personuvernd() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-32 text-main">
      <h1 className="mb-8 text-4xl font-extralight tracking-tight">
        Persónuverndarstefna
      </h1>
      <div className="space-y-6 text-base leading-relaxed text-gray-700">
        <p>
          MiniMax virðir persónuvernd þeirra sem heimsækja vefinn minimax.is.
          Hér kemur fram hvaða upplýsingum er safnað, hvers vegna og hvernig
          farið er með þær, í samræmi við lög nr. 90/2018 um persónuvernd og
          vinnslu persónuupplýsinga.
        </p>

        <h2 className="pt-4 text-2xl font-light text-main">Fyrirspurnir</h2>
        <p>
          Þegar þú sendir okkur fyrirspurn í gegnum formið á vefnum fáum við
          nafn þitt, netfang, símanúmer, nafn fyrirtækis (ef þú gefur það upp)
          og skilaboðin. Upplýsingarnar eru eingöngu notaðar til að svara
          fyrirspurninni og veita þá þjónustu sem þú biður um. Þær eru sendar
          okkur í tölvupósti í gegnum þjónustuaðilann Resend og eru ekki
          seldar né afhentar öðrum.
        </p>

        <h2 className="pt-4 text-2xl font-light text-main">Vafrakökur og mælingar</h2>
        <p>
          Vefurinn notar ekki auglýsinga- eða rakningarkökur. Við notum
          Cloudflare Web Analytics til að telja heimsóknir. Sú mæling notar
          ekki vafrakökur og safnar ekki upplýsingum sem auðkenna þig.
        </p>
        <p>
          Kortið á síðunni Hafa samband er frá Google Maps og hleðst aðeins ef
          þú velur að birta það. Þá gilda skilmálar og persónuverndarstefna
          Google.
        </p>

        <h2 className="pt-4 text-2xl font-light text-main">Varðveisla</h2>
        <p>
          Fyrirspurnir eru varðveittar eins lengi og þörf er á til að sinna
          erindinu og samskiptum við þig, eða eins og lög krefjast.
        </p>

        <h2 className="pt-4 text-2xl font-light text-main">Réttindi þín</h2>
        <p>
          Þú átt rétt á að fá að vita hvaða upplýsingar við höfum um þig, fá
          þær leiðréttar eða þeim eytt. Sendu okkur línu á{" "}
          <a className="underline" href="mailto:gunnar@minimax.is">
            gunnar@minimax.is
          </a>
          . Þú getur einnig leitað til Persónuverndar (personuvernd.is).
        </p>

        <h2 className="pt-4 text-2xl font-light text-main">Ábyrgðaraðili</h2>
        <p>
          MiniMax, Engihjalli 8, 200 Kópavogur. Netfang: gunnar@minimax.is.
        </p>
      </div>
    </main>
  );
}
