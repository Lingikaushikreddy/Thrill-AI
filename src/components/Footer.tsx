import { Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-[#FFFDF7] border-t border-[#F5E6D3] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="Thrill AI Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="font-bold text-xl text-[#2D2520]">Thrill AI</span>
                    </div>
                    <p className="text-[#5C5C5C] mb-6">Not just any AI. Your 24/7 Business Assistant.</p>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#2D2520] hover:bg-[#FF6B6B] hover:text-white transition-colors cursor-pointer">
                            <Twitter className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#2D2520] hover:bg-[#FF6B6B] hover:text-white transition-colors cursor-pointer">
                            <Linkedin className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center text-[#2D2520] hover:bg-[#FF6B6B] hover:text-white transition-colors cursor-pointer">
                            <Instagram className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-[#2D2520] mb-6">Product</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Features</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Pricing</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">API</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Integrations</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-[#2D2520] mb-6">Company</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">About</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Blog</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Careers</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-[#2D2520] mb-6">Legal</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Privacy Policy</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Terms of Service</a></li>
                        <li><a href="#" className="text-[#5C5C5C] hover:text-[#FF6B6B]">Security</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#F5E6D3] flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[#5C5C5C] text-sm">© 2025 Thrill AI. All rights reserved.</p>
                <div className="flex gap-8">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                    <span className="w-2 h-2 rounded-full bg-[#FFCC5C]" />
                    <span className="w-2 h-2 rounded-full bg-[#4CD964]" />
                </div>
            </div>
        </footer>
    );
}
