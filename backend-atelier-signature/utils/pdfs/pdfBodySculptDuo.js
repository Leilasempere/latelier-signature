import PDFDocument from "pdfkit";
import fs from "fs";

export function generateBodySculptDuoPDF(outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // TITRE
      doc
        .fontSize(22)
        .fillColor("#c27ba0")
        .text("Body Sculpt Duo – Guide Formation", { align: "center" })
        .moveDown(2);

      // SECTION : OBJECTIF
      doc.fontSize(18).fillColor("#000").text("Objectif du soin").moveDown(1);

      doc.fontSize(12).text(
        `• Réduire la cellulite et améliorer la fermeté de la peau.
• Stimuler la circulation sanguine et lymphatique.
• Lisser et tonifier la zone traitée.`,
        { lineGap: 6 }
      );

      doc.moveDown(2);

      // SECTION : DURÉE / MATERIEL
      doc.fontSize(18).text("Durée").moveDown(1);
      doc.fontSize(12).text("• 30 minutes par zone.").moveDown(2);

      doc.fontSize(18).text("Matériel nécessaire").moveDown(1);

      doc.fontSize(12).text(
        `• Appareil Body Sculpt Duo (Vacuum)
• Gel conducteur ou huile adaptée
• Serviette ou drap de protection`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : PRÉPARATION
      doc.fontSize(18).text("Préparation du soin (5 min)").moveDown(1);

      doc.fontSize(12).text(
        `1. Installer le client confortablement.
2. Vérifier la zone : propre et sèche.
3. Expliquer le déroulé du soin.
4. Appliquer le gel ou l’huile.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : DÉROULÉ
      doc.fontSize(18).text("Déroulé du soin par zone").moveDown(2);

      doc.fontSize(14).text("1️⃣ Vacuum – 15 min").moveDown(1);
      doc.fontSize(12).text(
        `• Régler l’intensité selon sensibilité.
• Mouvements lents et réguliers, toujours vers le cœur.
• Insister sur les zones avec relâchement ou cellulite.
• Vérifier confort du client régulièrement.`,
        { lineGap: 5 }
      );

      doc.moveDown(2);

      doc.fontSize(14).text("2️⃣ Palper-Rouler Manuel – 10 min").moveDown(1);
      doc.fontSize(12).text(
        `• Pincer légèrement la peau et rouler les tissus.
• Adapter la pression selon tolérance.
• Gestes réguliers et méthodiques vers le cœur.`,
        { lineGap: 5 }
      );

      doc.moveDown(2);

      doc.fontSize(14).text("3️⃣ Finitions – 5 min").moveDown(1);
      doc.fontSize(12).text(
        `• Essuyer gel/huile.
• Massage léger pour relaxer la zone.
• Conseils post-soin : hydratation, boire de l’eau, éviter chaleur excessive.`,
        { lineGap: 5 }
      );

      doc.addPage();

      // SECTION : ZONES
      doc.fontSize(18).text("Zones du corps et spécificités").moveDown(2);

      doc.fontSize(12).text(
        `1. Cuisses : cibler zones cellulite, mouvements intenses si amas graisseux.
2. Fesses : mouvements circulaires et verticaux.
3. Ventre : gestes doux, intensité adaptée.
4. Bras : mouvements plus légers, zones relâchées.
5. Dos et hanches : mouvements circulaires et remontants.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : CONSEILS
      doc.fontSize(18).text("Conseils & précautions").moveDown(1);

      doc.fontSize(12).text(
        `• Contre-indications : varices importantes, troubles circulatoires, grossesse, peaux fragiles.
• Adapter intensité et pression selon zone.
• Résultats optimaux sur plusieurs séances.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : FICHE RÉSUMÉ
      doc.fontSize(18).text("Body Sculpt Duo – Fiche Résumé").moveDown(2);

      doc.fontSize(12).text(
        `Zone      • Durée : 30 min
• Vacuum : drainage, stimulation circulation
• Palper-Rouler : lisser peau, casser adhérences
• Finitions : massage léger`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : BIENFAITS
      doc.fontSize(18).text("Bienfaits du protocole").moveDown(1);

      doc.fontSize(12).text(
        `• Réduction de la cellulite et des capitons.
• Lissage et raffermissement de la peau.
• Drainage lymphatique et stimulation de la circulation sanguine.
• Amélioration de l’élasticité cutanée.
• Réduction de l’effet peau d’orange.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : FRÉQUENCE
      doc.fontSize(18).text("Fréquence recommandée").moveDown(1);

      doc.fontSize(12).text(
        `• 1 à 2 séances par semaine (protocole 6 à 8 séances minimum).
• Résultats visibles dès la 4ᵉ séance.
• Entretien : 1 séance par mois.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : TARIFS
      doc.fontSize(18).text("Tarif haut de gamme recommandé").moveDown(1);

      doc.fontSize(12).text(
        `• Soin 30 min / zone : 90€ – 120€
• Forfait 6 séances / zone : 480€ – 650€
• Multi-zones : ajouter +30 à +40€ par zone supplémentaire.`,
        { lineGap: 6 }
      );

      doc.end();

      stream.on("finish", () => resolve(outputPath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
}
