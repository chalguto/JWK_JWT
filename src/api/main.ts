// #region
import {
	createSign,
	createVerify,
	generateKeyPairSync,
	createHash,
	randomUUID,
	createPublicKey,
	createPrivateKey,
} from 'node:crypto';
// #endregion

// #region
const ALGORITHM = 'RSA-SHA256';
const base64UrlEncode = (obj: any) =>
	Buffer.from(JSON.stringify(obj)).toString('base64url');
const encode = (val: any): string =>
	Buffer.from(val, 'binary').toString('base64url');
const decode = (val: any): string => Buffer.from(val, 'base64url').toString();
// #endregion

//////////////////////////////////////////////////////////////////
/////////////////////////// generar JWK /////////////////////////
//////////////////////////////////////////////////////////////////
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
	modulusLength: 2048,
});

// exportar la clave pública como JWK
const publicJwk = publicKey.export({ format: 'jwk' });
const privateJwk = privateKey.export({ format: 'jwk' });
const jwk = privateJwk;

console.log('Jwk Public', publicJwk);
console.log('Jwk Private', privateJwk);

////////////// Convert JWK to KEY
const pubKey = createPublicKey({ key: publicJwk, format: 'jwk' });
const priKey = createPrivateKey({ key: privateJwk, format: 'jwk' });

//////////// Get public KEY from private KEY
const _pubKey = createPublicKey(priKey);

//////////////////////////////////////////////////////////////////
/////////////////////////// firmar JWT ///////////////////////////
//////////////////////////////////////////////////////////////////
// crear header y payload
const getKid = (jwk: JsonWebKey): string =>
	encode(createHash(ALGORITHM).update(JSON.stringify(jwk)).digest());

const header = {
	alg: 'RS256',
	kid: getKid(jwk),
	typ: 'JWT',
};

const payload = {
	exp: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
	iat: Math.floor(Date.now() / 1000),
	jti: randomUUID(),
	userID: '123123',
	username: 'test',
};

// convertir a base64url
const base64Header = base64UrlEncode(header);
const base64Payload = base64UrlEncode(payload);

// crear el token sin firmar
const token = `${base64Header}.${base64Payload}`;

// firmar el token con la clave privada
const signature = createSign(ALGORITHM)
	.update(token)
	.sign(privateKey, 'base64url');

// token completo
const jwt = `${token}.${signature}`;
console.log('JWT', jwt);

//////////////////////////////////////////////////////////////////
///////////////////////// verificar JWT //////////////////////////
//////////////////////////////////////////////////////////////////
// obtener partes del JWT
const [jwtHeader, jwtPayload, jwtSignature] = jwt.split('.');

// verificar la firma
const isValid = createVerify(ALGORITHM)
	.update(`${jwtHeader}.${jwtPayload}`)
	.verify(publicKey, jwtSignature, 'base64url');

if (isValid) {
	console.log('Token válido');
	console.log('Payload:', JSON.parse(decode(jwtPayload)));
	console.log(`
	  .'""""""""""'.
	 /   O      O   \\
	:                :
	|    \\      /    |
	:     '----'     :
	 \\              /
	  '............'




	  `);
} else {
	console.error('Token inválido');
	console.log(`
	  .'""""""""""'.
	 /   O      O   \\
	:               :
	|     .----.    |
	:   .'      '.  :
	 \\             /
	  '...........'




	  `);
}
