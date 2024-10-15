import React from 'react';

const PolicyPage: React.FC = () => {
    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Terms of Service</h2>
                <p className="text-gray-600 leading-relaxed">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
                    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
                    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
                    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
            </section>
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                    Conduit uses JSON Web Tokens and a Key-Value database for sessions
                    and WebAuthn authenticators which resets every 2 hours.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                    Data provided to Conduit is exclusively used to support signing in
                    and is not passed to any third party services, other than via SMTP or
                    OAuth for the purposes of authentication. This data is deleted every
                    2 hours via cron job.
                </p>
            </section>
        </div>
    );
};

export default PolicyPage;
