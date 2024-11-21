export default function TermOfUsePage() {
  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL!);

  return (
    <>
      <div className="text-[0.625rem]">
        <p>
          Welcome to {url.hostname} (&quot;the Website&quot;). By using our Website, you agree to comply with and be
          bound by the following Terms of Use. Please review these terms carefully. If you do not agree to these terms,
          you should not use this Website.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">1. Acceptance of Terms</h2>

        <p>
          By accessing and using {url.hostname}, you acknowledge that you have read, understood, and agree to be legally
          bound by these Terms of Use and our Privacy Policy.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">2. Eligibility</h2>

        <p>
          Participation in any lotteries or games offered on {url.hostname} is restricted to individuals who are at
          least 18 years of age or the legal age for participating in such activities in your jurisdiction, whichever is
          higher. By using the Website, you represent and warrant that you meet this eligibility requirement.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">3. User Registration</h2>

        <p>
          To use certain features of the Website, you may be required to register for an account. You agree to provide
          true, accurate, current, and complete information during the registration process and update such information
          as necessary to maintain its accuracy.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">4. Use of the Website</h2>

        <p>
          You agree to use the Website in compliance with all applicable laws and regulations of Vietnam. You shall not:
        </p>
        <ul className="list-disc pl-3 text-[0.625rem]">
          <li>Use the Website for any unlawful purpose.</li>
          <li>
            Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Website without express written
            permission from {url.hostname}.
          </li>
          <li>Engage in any activity that interferes with or disrupts the Website.</li>
        </ul>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">5. Lottery Rules</h2>

        <p>
          Each lottery offered on the Website will have its own specific rules and terms. You agree to comply with these
          rules and terms, which will be provided before participating in each lottery.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">6. Disclaimers</h2>

        <p>
          The Website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis.{" "}
          {url.hostname}
          makes no warranties, express or implied, regarding the Website&apos;s operation or the information, content,
          or materials included therein.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">7. Limitation of Liability</h2>

        <p>
          To the fullest extent permitted by law, {url.hostname} shall not be liable for any direct, indirect,
          incidental, special, or consequential damages arising out of or relating to the use of or the inability to use
          the Website.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">8. Termination</h2>

        <p>
          {url.hostname} reserves the right to terminate or suspend your account and access to the Website at our sole
          discretion, without prior notice, for conduct that we believe violates these Terms of Use or is harmful to
          other users of the Website, us, or third parties, or for any other reason.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">9. Governing Law</h2>

        <p>
          These Terms of Use are governed by and construed in accordance with the laws of Vietnam, without regard to its
          conflict of law principles.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">10. Changes to Terms of Use</h2>

        <p>
          {url.hostname} reserves the right to modify these Terms of Use at any time. Any changes will be effective
          immediately upon posting on the Website. Your continued use of the Website following the posting of changes
          constitutes your acceptance of such changes.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">11. Contact Information</h2>

        <p>
          For any questions regarding these Terms of Use, please contact us at{" "}
          <a className="text-blue-500 underline" href="mailto:cs@xosotot.com">
            cs@xosotot.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
