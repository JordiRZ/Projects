import mongoose from 'mongoose'
import { User, Product, Surgery } from '.'

mongoose.connect('mongodb://localhost:27017/innospine')
    .then(() => Promise.all([
        User.deleteMany(),
        Product.deleteMany(),
        Surgery.deleteMany()
    ]))
    .then(() => Promise.all([
        User.create([
            { name: 'Clavel', email: 'equipo@clavel.com', password: '1Z' }
        ]),
        Product.create([
            { name: 'Lumbar Prothesis InnoV', type: 'Implant', surgeryType: 'lumbar posterior', image: 'https://avicenna-klinik.com/fileadmin/user_upload/therapien/wirbelsaeulentherapien/activC_i2.jpg', description: 'Innospines lumbar prosthesis is meticulously designed to replicate the natural structure and function of the lumbar disc. Typically composed of biocompatible materials like titanium or medical-grade polymers, the prosthesis consists of two components to mimic the characteristics of the lumbar spine', price: 2000 },
            { name: 'Cervical Prothesis InnoV', type: 'Implant', surgeryType: 'cervical anterior', image: 'https://www.bbraun.es/content/dam/catalog/bbraun/bbraunProductCatalog/S/AEM2015/es-es/b1/activc2.jpeg', description: 'Innospines cervical prosthesis is engineered to mimic the natural structure and function of the cervical disc. It typically consists of two components made of biocompatible materials such as titanium or medical-grade polymers', price: 2500 },
            { name: 'Cervical kit', type: 'Instrument', surgeryType: 'cervical anterior', image: 'https://5.imimg.com/data5/XQ/WD/RM/ANDROID-79230073/product-jpeg-500x500.png', description: 'The cervical kit spine access offers secure, table mounted solutions that prevent shifting, or “rise up” in the incision. Independent retraction and blade positioning eliminates the need for excess retraction required by self-retaining retractors to stay in place', price: 100 },
            { name: 'Lumbar kit', type: 'Instrument', surgeryType: 'lumbar posterior', image: 'https://www.biopsybell.com/wp-content/uploads/2020/10/Kit-cifoplastica-verde-new11G_con-nomi-987x1024.png', description: ' Lumbar kit system for kyphoplasty procedures to treat fractures, restore vertebral body height and reduce back pain', price: 100 }
        ])
    ]))
    .then(([users, products]) => {
        return Surgery.create([
            {
                author: users[0]._id,
                creationDate: new Date().toLocaleString(),
                surgeryDate: new Date('10/10/2024').toLocaleString(),
                name: 'Lumbar Posterior Artrodesis 3nv',
                products: [products[3]._id],
                type: 'Lumbar',
                hospital: 'Quironsalud Barcelona',
                note: 'Ojoooo que el material es delicado, dejarlo en la 5nta planta y esperad al instrumentista'
            }
        ])
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)