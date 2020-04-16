import React from "react";
import "./Home.css";
import TimeImage from "./time.png";
import ClocksImage from "./clocks.png";
const Home = () => {
  return (
    <div>
      <p className="uclm-title">Gestión de tiempo académico</p>
      <div className="text-wrapper">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iam enim
          adesse poterit. Quae quidem res efficit, ne necesse sit isdem de rebus
          semper quasi dictata decantare neque a commentariolis suis discedere.
          Quid est enim aliud esse versutum? Duo Reges: constructio interrete.
          Chrysippus autem exponens differentias animantium ait alias earum
          corpore excellere, alias autem animo, non nullas valere utraque re;
          Simus igitur contenti his. Nihil enim desiderabile concupiscunt,
          plusque in ipsa iniuria detrimenti est quam in iis rebus emolumenti,
          quae pariuntur iniuria.
        </p>
        <br />
        <figure className="image is-3by1">
          <img src={ClocksImage} alt="clockImage"/>
        </figure>
        <br />
        <p>
          Sed tamen enitar et, si minus multa mihi occurrent, non fugiam ista
          popularia. Qui igitur convenit ab alia voluptate dicere naturam
          proficisci, in alia summum bonum ponere? Negat enim summo bono afferre
          incrementum diem. At ille non pertimuit saneque fidenter: Istis quidem
          ipsis verbis, inquit; Equidem, sed audistine modo de Carneade?
          Praesertim cum in re publica princeps esse velles ad eamque tuendam
          cum summa tua dignitate maxime a nobis ornari atque instrui posses.
          Octavium, Marci filium, familiarem meum, confici vidi, nec vero semel
          nec ad breve tempus, sed et saepe et plane diu. Ego autem tibi, Piso,
          assentior usu hoc venire, ut acrius aliquanto et attentius de claris
          viris locorum admonitu cogitemus.
        </p>
        <br />
        <figure className="image is-2by1">
          <img src={TimeImage} alt="timeImage"/>
        </figure>
        <br />
        <p>
          Illorum vero ista ipsa quam exilia de virtutis vi! Quam tantam volunt
          esse, ut beatum per se efficere possit. Qui non moveatur et offensione
          turpitudinis et comprobatione honestatis? Sed ut iis bonis erigimur,
          quae expectamus, sic laetamur iis, quae recordamur. Verba tu fingas et
          ea dicas, quae non sentias? Quamquam scripsit artem rhetoricam
          Cleanthes, Chrysippus etiam, sed sic, ut, si quis obmutescere
          concupierit, nihil aliud legere debeat. Atque ut ceteri dicere
          existimantur melius quam facere, sic hi mihi videntur facere melius
          quam dicere. Quae cum essent dicta, finem fecimus et ambulandi et
          disputandi. Ea possunt paria non esse. Cur igitur, inquam, res tam
          dissimiles eodem nomine appellas? Uterque enim summo bono fruitur, id
          est voluptate.
        </p>
      </div>
    </div>
  );
};

export default Home;
