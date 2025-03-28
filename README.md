# 🟢 **Generación de JWK y JWT con node:crypto**

## 👁️ **Cómo generar un JWK y usarlo para firmar y verificar un JWT usando el módulo crypto de Node.js en TypeScript?**

-   1. Generar el Par de Claves (JWK)
Primero, generamos un par de claves RSA (pública y privada). La clave pública se exportará como JWK.

 2. Firmar un JWT
Para firmar un JWT, combinamos el encabezado, el payload, y firmamos usando la clave privada. Los datos se codifican en base64url.

3. Verificar el JWT
Para verificar el JWT, comprobamos que la firma es válida usando la clave pública.

---

<br />

<p align="center">
  <img
    width="15%"
    src="https://www.achs.cl/images/librariesprovider2/marca/logo-achs.svg"
  />
  <h2 align="center">ASOCIACIÓN CHILENA DE SEGURIDAD</h2>
  <h3 align="center">Transformación Digital ▪ Equipo de Desarrollo</h3>
</p>
