
chemin1 =    ["usager","tarif-fixe", "€-g", "taxes-g","état","c-g-b","EDF","RTE","Enedis","subvention","apport-capital","service-système-g","jaune","ARENH", "40-fournisseurs","dividendes-g","actionnaires", "lampe"]
chemin2 =     ["usager","tarif-libre", "€-d", "taxes-d","état","c-d-b","40-fournisseurs","RTE","Enedis","spéculation","service-système-d","jaune-a","jaune", "dividendes-d","actionnaire", "lampe"]
liste1 = [0,"Dans un contrat d’électricité à prix fixe, les tarifs du kWh HT sont bloqués dès la souscription et pendant une durée déterminée (de 1 à 3 ans en moyenne). Ce qui veut dire concrètement que les tarifs de l’électricité n’évoluent pas en même temps que le Tarif réglementé de vente (TRV). Pour rappel, le TRV est le seul tarif réglementé du marché fixé par les pouvoirs publics. Il sert d’indice de référence à la plupart des fournisseurs pour établir leur grille tarifaire.", 0, "Elle est calculée par application d'un taux (21,93% pour les sites raccordés au réseau public de distribution et 10,11% pour les sites raccordés au réseau public de Transport) sur la part fixe du TURPE (Tarif d'Utilisation des Réseaux Publics d'Électricité). Son montant est ainsi indépendant des consommations.",0,0,0,0,0,"Le développement des énergies renouvelables bénéficie d’un soutien de l’État soit en amont dans le domaine de la recherche et développement, soit en phase d’industrialisation en soutien à la demande et au déploiement commercial (par exemple par le biais de tarifs d'achat, d’appels d’offres ou de dispositifs fiscaux).","Les apports en capital sont des biens (ex. : somme d'argent, fonds de commerce, immeuble, etc.) que les associés transmettent à la société en vue d'une exploitation commune. En contrepartie, les apporteurs reçoivent des titres (parts ou actions) soumis aux aléas de la société.","Les Services Système fréquence (Réserve Primaire et Réserve Secondaire) permettent au gestionnaire du Réseau de Transport d'Électricité RTE d'assurer l'équilibre à tout instant entre la production et la consommation électrique en France métropolitaine.",0,"L'« ARENH » signifie « Accès Régulé à l'Électricité Nucléaire Historique ». Il permet à tous les fournisseurs alternatifs de s'approvisionner en électricité auprès d'EDF dans des conditions fixées par les pouvoirs publics.\n Transfer virtuel: Transfer de contrat entre les fournisseurs alternatifs et EDF.", 0,"Un dividende est une somme d’argent versée par une entreprise à ses actionnaires pour leur donner une part des bénéfices qu’elle a réalisés.",0, 0]
liste2 = [0,"Alternatives aux offres à prix fixes, les contrats d’électricité à prix variables proposent des prix du kWh HT et de l’abonnement HT évoluant selon les augmentations et les baisses d’un indice de référence. Dans la majorité des offres à prix variables, les prix de l’électricité sont indexés à la hausse ou à la baisse sur le TRV en fonction des révisions annuelles décidées par les pouvoirs publics (2 fois par an en général, en février et en août).", 0, "Elle est calculée par application d'un taux (21,93% pour les sites raccordés au réseau public de distribution et 10,11% pour les sites raccordés au réseau public de Transport) sur la part fixe du TURPE (Tarif d'Utilisation des Réseaux Publics d'Électricité). Son montant est ainsi indépendant des consommations.",0,0,0,0,0,"Le développement des énergies renouvelables bénéficie d’un soutien de l’État soit en amont dans le domaine de la recherche et développement, soit en phase d’industrialisation en soutien à la demande et au déploiement commercial (par exemple par le biais de tarifs d'achat, d’appels d’offres ou de dispositifs fiscaux).","Les apports en capital sont des biens (ex. : somme d'argent, fonds de commerce, immeuble, etc.) que les associés transmettent à la société en vue d'une exploitation commune. En contrepartie, les apporteurs reçoivent des titres (parts ou actions) soumis aux aléas de la société.","La spéculation, c’est quand des acteurs achètent ou vendent de l’électricité (ou d’autres biens) non pas pour la consommer, mais pour gagner de l’argent en profitant des variations de prix.","service-sytème-d",0,0, "Un dividende est une somme d’argent versée par une entreprise à ses actionnaires pour leur donner une part des bénéfices qu’elle a réalisés.",0, 0]

function path(nb_chemin) {
    if (nb_chemin == 0) {
        for (let i = 0; i<chemin1.length ; i++) {
            setTimeout(() => {
                aparition(chemin1[i])
                if (liste1[i] != 0) {alert(liste1[i])}

            }, (i+1)*500);
        }
        setTimeout(() => {path(1)}, (chemin1.length+2)*500);
    } else {
        for (let i = 0; i<chemin2.length ; i++) {
            setTimeout(() => {
                aparition(chemin2[i])
                if (liste1[i] != 0) {alert(liste2[i])}
            }, (i+1)*500);
        }
        setTimeout(() => {
            document.getElementById("lampe1").style.display = "none"
            document.getElementById("lampe2").style.display = "block"*
            alert("bravo la lampe est alumé")
        }, (chemin2.length+2)*500);
    }
}

function aparition(params) {
    
    var cols = document.getElementsByClassName(params);
    for(i=0; i<cols.length; i++) {
      cols[i].style.display = "none";
    }
}

document.body.onload = path(0);
