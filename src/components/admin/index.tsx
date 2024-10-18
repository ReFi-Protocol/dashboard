import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";

import { ProgramConfig } from "../../web3/solana/staking/types";

import ConnectWalletModal from "../connect-wallet-modal";

import CurrentConfig from "./components/CurrentConfig";
import { getConfig } from "../../web3/solana/staking/service/getConfig";
import { TextInput } from "../TextInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PublicKey } from "@solana/web3.js";
import { Button } from "../Button";
import { BN } from "@coral-xyz/anchor";
import { D } from "../../web3/util/d";
import { APY_DECIMALS, SPL_DECIMALS } from "../../web3/solana/const";
import { updateConfig } from "../../web3/solana/staking/service/updateConfig";
import { useCustomToast } from "../../utils";


function isSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}

function updateNftDaysApy(
  nftDaysApy: any[],
  daysToUpdate: number,
  newApy: number
) {
  return nftDaysApy.map(item => {
    if (item.days === daysToUpdate) {
      return { ...item, apy: newApy };
    }
    return item;
  });
}

export const zodAddress = z.string().refine((value) => isSolanaAddress(value), {
  message: "Provided address is invalid",
});

const zodNumberString = z.string().transform((val, ctx) => {
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid number",
    });
    
    return z.NEVER;
  }
  return parsed;
});

const updateConfigSchema = z.object({
  admin: z.union([
    zodAddress,
    z.literal(''),
  ]),
  baseLockDays: z.union([
    zodNumberString,
    z.literal(''),
  ]),
  maxNftApyDurationDays:  z.union([
    zodNumberString,
    z.literal(''),
  ]),
  baseApy: z.union([
    zodNumberString,
    z.literal(''),
  ]),
  maxNftRewardLamports: z.union([
    zodNumberString,
    z.literal(''),
  ]),
  nftDaysApy45:  z.union([
    zodNumberString,
    z.literal(''),
  ]),
  nftDaysApy80:  z.union([
    zodNumberString,
    z.literal(''),
  ]),
  nftDaysApy90:  z.union([
    zodNumberString,
    z.literal(''),
  ]),
});

const example = {
  admin: null,
  baseLockDays: 0,
  maxNftApyDurationDays: null,
  baseApy: 350,
  maxNftRewardLamports: null,
  nftDaysApy: [
    { days: 45, apy: 1650 },
    { days: 80, apy: 4650 },
    { days: 90, apy: 10650 },
  ],
};


export type UpdateConfigForm = z.infer<typeof updateConfigSchema>;

export function useConfigForm() {
  return useForm<UpdateConfigForm>({
    resolver: zodResolver(updateConfigSchema),
  });
}



const AdminContent: FC = () => {
  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const [isModalOpen, setModalOpen] = useState(true);
  const showToast = useCustomToast();

  const wallet = useWallet();

  const [config, setConfig] = useState<ProgramConfig | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useConfigForm();

  const submitHandler = async ({admin, nftDaysApy45, nftDaysApy80, nftDaysApy90, baseApy, baseLockDays, maxNftApyDurationDays, maxNftRewardLamports}: UpdateConfigForm) => {

    let updatedApy = JSON.parse(JSON.stringify(config?.nftDaysApy))

    if (nftDaysApy45) {
      updatedApy = updateNftDaysApy(updatedApy, 45,  D(nftDaysApy45, APY_DECIMALS),)
    }
    if (nftDaysApy80) {
      updatedApy=   updateNftDaysApy(updatedApy, 80,  D(nftDaysApy80, APY_DECIMALS),)
    }
    if (nftDaysApy90) {
      updatedApy= updateNftDaysApy(updatedApy, 90,  D(nftDaysApy90, APY_DECIMALS),)
    }

    const updateArgs = {
      admin: admin === '' ? null : new PublicKey(admin),
      baseLockDays: baseLockDays === "" ? null: baseLockDays,
      maxNftApyDurationDays: maxNftApyDurationDays === "" ? null : maxNftApyDurationDays,
      baseApy:  baseApy === "" ? null: D(baseApy, APY_DECIMALS),
      maxNftRewardLamports:  maxNftRewardLamports === "" ? null: new BN(D(maxNftRewardLamports, SPL_DECIMALS)),
      nftDaysApy: updatedApy
    };

    console.log(updateArgs);

    if (anchorWallet) {
      try {
        await updateConfig(walletContext, anchorWallet, updateArgs);
      } catch (e: any) {
        showToast({
          title: "Error",
          description: e.message,
          status: "error",
        });

        console.error(e);
      }
    }
  };




  useEffect(() => {
    if (anchorWallet) {
      getConfig(anchorWallet).then((config) => {
        setConfig(config)
      });
    }
  }, [anchorWallet]);





  if (!wallet.publicKey) {
    return (
      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    );
  }  

  return (
    <div>
     {config &&  <CurrentConfig config={config} />}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
      <form onSubmit={handleSubmit(submitHandler)}>
        <TextInput
          {...register("admin")}
          error={errors.admin}
          label={`new admin (address)`}
        />
         <TextInput
         className="mt-4"
          {...register("baseLockDays")}
          error={errors.baseLockDays}
          label={`base lock days`}
        />
         <TextInput
         className="mt-4"
          {...register("maxNftApyDurationDays")}
          error={errors.maxNftApyDurationDays}
          label={`max nft apy duration days`}
        />

        <TextInput
         className="mt-4"
          {...register("baseApy")}
          error={errors.baseApy}
          label={`base apy`}
        />
        <TextInput
         className="mt-4"
          {...register("nftDaysApy45")}
          error={errors.nftDaysApy45}
          label={`apy for 45 days lock`}
        />
        <TextInput
         className="mt-4"
          {...register("nftDaysApy80")}
          error={errors.nftDaysApy80}
          label={`apy for 80 days lock`}
        />
        <TextInput
         className="mt-4"
          {...register("nftDaysApy90")}
          error={errors.nftDaysApy90}
          label={`apy for 90 days lock`}
        />
        <TextInput
         className="mt-4"
          {...register("maxNftRewardLamports")}
          error={errors.maxNftRewardLamports}
          label={`max nft rewards`}
        />


            <button type='submit' className="mt-4 text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white">
              Sign and send
            </button>
        </form>
      </div>
    </div>
  );
};

export default AdminContent;
