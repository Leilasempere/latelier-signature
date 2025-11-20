import PDFDocument from "pdfkit";
import fs from "fs";

export function generateVacuoLiftPDF(outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // TITRE
      doc
        .fontSize(22)
        .fillColor("#c27ba0")
        .text("Vacuo-Lift (Visage) – Guide Formation", { align: "center" })
        .moveDown(2);

      // SECTION : OBJECTIF
      doc.fontSize(18).fillColor("#000").text("Objectif du soin").moveDown(1);

      doc.fontSize(12).text(
        `• Stimuler la circulation sanguine et lymphatique du visage.
• Tonifier et raffermir la peau grâce au vacuum et à la radiofréquence.
• Réduire les rides, améliorer l’élasticité et l’éclat du teint.`,
        { lineGap: 6 }
      );

      doc.moveDown(2);

      // DURÉE / MATÉRIEL
      doc.fontSize(18).text("Durée").moveDown(1);
      doc.fontSize(12).text("• 1 heure.").moveDown(2);

      doc.fontSize(18).text("Matériel nécessaire").moveDown(1);
      doc.fontSize(12).text(
        `• Appareil Vacuo-Lift (Vacuum visage + Radiofréquence)
• Gel conducteur spécifique visage
• Serviette ou drap de protection`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : PRÉPARATION
      doc.fontSize(18).text("Préparation du soin (10 min)").moveDown(1);

      doc.fontSize(12).text(
        `1. Installer le client confortablement, tête légèrement inclinée.
2. Démaquiller et nettoyer soigneusement le visage.
3. Expliquer le déroulé du soin.
4. Appliquer le gel conducteur.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION : DÉROULÉ
      doc.fontSize(18).text("Déroulé du soin – 1h").moveDown(2);

      doc.fontSize(14).text("1️⃣ Vacuum visage – 20 min").moveDown(1);
      doc.fontSize(12).text(
        `Objectif : stimuler circulation sanguine et drainage lymphatique.
Technique :
• Débuter avec intensité faible, puis ajuster selon tolérance.
• Mouvements lents sur joues, front, mâchoires.
• Remonter vers tempes et cou pour drainage lymphatique.
• Zone yeux : très doux.`,
        { lineGap: 5 }
      );

      doc.moveDown(2);

      doc.fontSize(14).text("2️⃣ Radiofréquence visage – 25 min").moveDown(1);
      doc.fontSize(12).text(
        `Objectif : raffermir et stimuler collagène.
Technique :
• Embout adapté visage + gel conducteur.
• Mouvements circulaires réguliers (joues, front, menton, contour yeux).
• Vérifier tolérance à la chaleur.`,
        { lineGap: 5 }
      );

      doc.moveDown(2);

      doc.fontSize(14).text("3️⃣ Finitions – 5 min").moveDown(1);
      doc.fontSize(12).text(
        `• Essuyer gel.
• Appliquer crème ou sérum adapté.
• Massage doux.
• Conseils post-soin : hydratation + éviter soleil 24h.`,
        { lineGap: 5 }
      );

      doc.addPage();

      // SECTION : CONSEILS
      doc.fontSize(18).text("Conseils & précautions").moveDown(1);

      doc.fontSize(12).text(
        `• Contre-indications : pacemaker, grossesse, peaux très sensibles ou lésions actives.
• Vérifier tolérance chaleur avant et pendant radiofréquence.
• Résultats optimaux sur plusieurs séances.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // FICHE FORMATION
      doc.fontSize(18).text("Vacuo-Lift – Fiche Formation").moveDown(2);

      doc.fontSize(12).text(
        `Préparation – 10 min : démaquillage, nettoyage, gel conducteur.
Vacuum visage – 20 min : drainage, stimulation circulation.
Radiofréquence – 25 min : raffermissement, tonification.
Finitions – 5 min : massage doux, application sérum.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // BIENFAITS
      doc.fontSize(18).text("Bienfaits du protocole").moveDown(1);

      doc.fontSize(12).text(
        `• Raffermissement et tonification de la peau du visage et du cou.
• Réduction rides et ridules.
• Amélioration éclat, ovale du visage.
• Stimulation collagène et élastine.
• Effet lifting naturel + drainage lymphatique.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // FRÉQUENCE
      doc.fontSize(18).text("Fréquence recommandée").moveDown(1);

      doc.fontSize(12).text(
        `• 1 séance/semaine durant 4 à 6 semaines.
• Entretien : 1 séance toutes les 3 à 4 semaines.
• Résultats visibles dès 2 à 3 séances, optimaux après 6 séances.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // TARIFS
      doc.fontSize(18).text("Tarif haut de gamme recommandé").moveDown(1);

      doc.fontSize(12).text(
        `• Soin 1h visage : 120€ – 160€
• Forfait 6 séances : 650€ – 900€
• Options ciblées (contour yeux, cou) : +30 à +50€`,
        { lineGap: 6 }
      );

      doc.addPage();

      // CONSEILS POUR POSITIONNEMENT PREMIUM
      doc.fontSize(18).text("Conseils pour un positionnement haut de gamme").moveDown(1);

      doc.fontSize(12).text(
        `• Mettre en avant l’exclusivité du protocole.
• Créer une expérience client premium : accueil, musique, senteurs, serviettes chaudes.
• Proposer des forfaits multi-séances avec suivi personnalisé.
• Utiliser appareils dernière génération + gestes experts.`,
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
