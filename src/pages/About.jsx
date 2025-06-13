const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <section className="max-w-5xl mx-auto px-6 py-16 sm:px-10 lg:px-12 space-y-20">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">
            Tentang BatikEye
          </h1>

          <article className="prose max-w-none mx-auto text-gray-900">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 pb-2 border-b-2 border-black">
              Latar Belakang BatikEye
            </h2>
            <p className="leading-relaxed text-base sm:text-lg">
              Proyek BatikEye lahir dari sebuah gagasan sederhana, bagaimana jika motif batik dapat dikenali 
              secara otomatis melalui foto, layaknya aplikasi pengenal tanaman atau wajah ? Ide ini muncul dari keprihatinan kami 
              melihat banyak generasi muda yang mengenakan batik hanya sebagai formalitas, tanpa memahami nama motif, asal daerah, 
              maupun makna filosofis di baliknya. Padahal, batik adalah warisan budaya Indonesia yang diakui UNESCO dan sarat akan nilai sejarah.
            </p>
            <p className="leading-relaxed text-base sm:text-lg mt-4">
              Dengan teknologi pengenalan gambar, BatikEye memungkinkan Anda mengunggah foto batik dan mendapatkan informasi tentang motif, 
              asal-usul, dan filosofi yang terkandung di dalamnya. Kami berharap platform ini dapat melestarikan dan memperkenalkan budaya 
              batik kepada generasi muda dan dunia.
            </p>

            <p className="leading-relaxed text-base sm:text-lg mt-4">
              Dengan latar belakang kami di bidang pengembangan aplikasi dan teknologi machine learning, 
              kami melihat potensi untuk menciptakan solusi. BatikEye dirancang bukan hanya sebagai aplikasi informatif, 
              tetapi juga sebagai platform edukatif yang menyenangkan untuk mendukung pelestarian budaya Indonesia. 
              Kami memulai dari permasalahan sehari-hari dan mengolahnya menjadi solusi digital yang relevan dan berdampak.
            </p>    
            <br />        
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 pb-2 border-b-2 border-black">
              Sejarah Singkat Batik
            </h3>
            <br />
            <p className="leading-relaxed text-base sm:text-lg">
              Batik telah ada sejak ratusan tahun yang lalu dan telah menjadi bagian penting dari budaya Indonesia. 
              Teknik pembuatan batik yang rumit dan penuh seni diwariskan secara turun-temurun. UNESCO pun telah mengakui batik sebagai Warisan Budaya Takbenda Dunia pada 
              tahun 2009.
            </p>
            <br />
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 pb-2 border-b-2 border-black">
              Filosofi dan Makna Motif Batik
            </h3>
            <p className="leading-relaxed text-base sm:text-lg">
              Setiap motif batik memiliki filosofi yang berbeda, misalnya motif Parang melambangkan kekuatan dan keberanian, sedangkan motif Kawung melambangkan keabadian dan kesucian. BatikEye menyediakan penjelasan mendalam tentang makna setiap motif agar pengguna dapat lebih menghargai dan memahami budaya ini.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default About;