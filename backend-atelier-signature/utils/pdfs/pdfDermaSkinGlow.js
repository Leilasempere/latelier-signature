import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/**
 * Génère le PDF complet de la formation DermaSkinGlow (ID = 1)
 */
export function generateDermaSkinGlowPDF(outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // TITRE
      doc
        .fontSize(22)
        .fillColor("#c27ba0")
        .text("DermaSkinGlow - Guide Formation", { align: "center" })
        .moveDown(2);

      // SECTION 1 : INTRODUCTION
      doc.fontSize(18).fillColor("#000").text("1. Introduction").moveDown(1);

      doc.fontSize(12).text(
        `• Présentation de L’Atelier Signature
• Nom de la formation : DermaSkinGlow – Protocole visage exclusif
• Durée du soin enseigné : 1h45
• Niveau : Professionnels de l’esthétique, débutants acceptés
• Format : Formation en ligne (PDF téléchargeable après achat) + journée pratique en présentiel pour validation et certificat

Objectifs :
• Maîtriser le protocole haut de gamme combinant Hydrafacial, Microneedling et Radiofréquence.
• Offrir un soin visage premium, efficace et personnalisé.
• Développer une prestation différenciante pour votre institut.`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 2 : THÉORIE
      doc.fontSize(18).text("2. Théorie & Bases Scientifiques").moveDown(1);

      doc.fontSize(12).text(
        `• Hydrafacial : nettoyage profond, exfoliation, infusion de sérums, hydratation et éclat
• Microneedling : micro-perforations pour stimuler le collagène et l’élasticité
• Radiofréquence visage : tonification des muscles, raffermissement, effet lifting doux
• Indications : éclat, peau ferme, texture améliorée
• Contre-indications : peaux sensibles, pathologies dermatologiques, traitements médicaux récents, grossesse`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 3 : PRÉPARATION
      doc.fontSize(18).text("3. Préparation du soin").moveDown(1);

      doc.fontSize(12).text(
        `• Matériel : Hydrafacial, stylo de Microneedling, appareil RF, sérums adaptés
• Préparation de l’espace : hygiène, ambiance premium
• Préparation de la cliente : questionnaire santé, démaquillage, désinfection`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 4 : PROTOCOLE COMPLET
      doc.fontSize(18).text("4. Déroulé du Protocole (1h45)").moveDown(1);

      doc.fontSize(12).text(
        `Étape 1 – Hydrafacial (30 min)
• Nettoyage, exfoliation, extraction, infusion sérums

Étape 2 – Microneedling (30 min)
• Sérum conducteur + stimulation collagène

Étape 3 – Radiofréquence visage (20 min)
• Tonification, raffermissement, effet lifting doux

Étape 4 – Hydrafacial post-soin (15 min)
• Sérum apaisant, hydratation

Étape 5 – Massage & finition (10 min)
• Massage doux + crème protectrice + SPF`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 5 : RÉSULTATS
      doc.fontSize(18).text("5. Résultats attendus").moveDown(1);

      doc.fontSize(12).text(
        `• Immédiat : éclat, peau repulpée, hydratée
• Moyen terme : fermeté, texture lissée, ridules atténuées`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 6 : MATÉRIEL
      doc.fontSize(18).text("6. Matériel & Produits recommandés").moveDown(1);

      doc.fontSize(12).text(
        `Hydrafacial : nettoyage + sérums
Microneedling : stimulation collagène
Radiofréquence : raffermissement
Sérums & crèmes : hydratants, anti-âge, apaisants, SPF`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 7 : BIENFAITS
      doc.fontSize(18).text("7. Bienfaits du soin DermaSkinGlow").moveDown(1);

      doc.fontSize(12).text(
        `• Nettoyage profond
• Éclat immédiat
• Régénération cellulaire
• Fermeté et densité
• Peau lisse et repulpée`,
        { lineGap: 6 }
      );

      doc.addPage();

      // SECTION 8 : TARIFS
      doc.fontSize(18).text("8. Fréquence & Tarification recommandée").moveDown(1);

      doc.fontSize(12).text(
        `• 1 séance toutes les 3 à 4 semaines
• Cure : 3 à 5 séances
• Tarif : 150 € à 220 €
• Forfaits 3 ou 5 séances possibles`,
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
